import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AddressBook } from '../../../models/model';
import { environment } from '../../../../environments/environment';
import { SocketServiceService } from 'src/app/services/socket/socket-service.service';

@Component({
  selector: 'add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {

  @Input() USERS: any;

  @Input() data: any;

  private DATA = {
    addressBookContactId: null,
    friendUserCode: null,
    friendDisplayName: null,
    contactMethod: null,
    friendBlock: null,
    requestStatus: null
  } as AddressBook;

  constructor(private localStorageService: LocalStorageService, private chat: ChatService, private socket: SocketServiceService) { }

  ngOnInit() {
    this.localStorageService.allStorage().then(user => {
      const userDetails = JSON.parse(user.user);
      this.socket.recieveRequest(userDetails.username).subscribe(data => {
        this.USERS._embedded.user.forEach(req => {
          if (req.username === data.username && !req.isFriendRequestForApproval) {
            const key = 'isFriendRequestForApproval';
            req[key] = true;
          }
          if (data.username === req.username) {
            req.addressBookId = data.addressBookContactId;
          }
        });
      });

      this.socket.requestApproval(userDetails.username).subscribe(data => {
        this.localStorageService.allStorage().then(userData => {
          const addBook = userData.AddressBook ? JSON.parse(userData.AddressBook) : [];
          console.log(addBook, user);
          console.log(data);
          if (addBook.length) {
            addBook.forEach(element => {
              if (data.username === element.friendUserCode && element.requestStatus === 'PENDING') {
                element.requestStatus = data.requestStatus;
              }
            });
            this.USERS._embedded.user.forEach((element, i) => {
              if (element.isFriendRequestSend) {
                this.USERS._embedded.user.splice(i, 1);
              }
            });
            this.localStorageService.setItem('AddressBook', JSON.stringify(addBook)).then(() => {
              console.log('done');
            }).catch(err => {
              console.log(err);
            });
          }
        });
      });
    });
  }

  addFriend(friend, index) {
    const data = {
      ownerUser: `${environment.BASEURL_OnShore}api/v1/onshore/user/${this.data.user.userId}{?projection}`,
      friendUser: friend._links.self.href,
      contactMethod: 'CHAT',
      receiveSosAlert: false
    };
    this.USERS._embedded.user[index].isFriendRequestForApproval = false;
    this.USERS._embedded.user[index].isFriendRequestSend = true;
    this.chat.addFriend(data).then(response => {
      console.log(response);
      let address = [];
      this.DATA.friendBlock = response.isFriendBlock;
      this.DATA.contactMethod = response.contactMethod;
      this.DATA.addressBookContactId = response.id; // addressBookContactId = id
      this.DATA.friendDisplayName = response._embedded.friendUser.displayName;
      this.DATA.friendUserCode = response._embedded.friendUser.username;
      this.DATA.requestStatus = response.requestStatus;
      this.localStorageService.getItem('AddressBook').then((res) => {
        if (res) {
          address = JSON.parse(res);
        }
        address.push(this.DATA);
        this.localStorageService.setItem('AddressBook', JSON.stringify(address)).then(() => {
          // this.USERS.splice(index, 1);
          // friend.isFriendRequestSend = true;
          // this.USERS._embedded.user = this.findAndSave(this.USERS._embedded.user, friend.username, friend);
          // console.log(friend);
          console.log('done');
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  findAndSave(arry, value, obj) {
    for (let i = 0; i < arry.length; i++) {
      if (arry[i].username === value) {
        arry.splice(i, 1);
        break;
      }
    }
    arry.push(obj);
    return arry;
  }

  confirmFriend(user, index) {
    console.log(user);
    this.chat.confirmFriend(user).then(data => {
      this.localStorageService.getItem('AddressBook').then((res) => {
        const addBook = JSON.parse(res) ? JSON.parse(res) : [];
        const addBookData = {
          addressBookContactId: data.id,
          contactMethod: data.contactMethod,
          friendBlock: data.isFriendBlock,
          friendDisplayName: data._embedded.ownerUser.displayName,
          friendUserCode: data._embedded.ownerUser.username,
          requestStatus: data.requestStatus,
        };
        addBook.push(addBookData);
        this.USERS._embedded.user.splice(index, 1);
        this.localStorageService.setItem('AddressBook', JSON.stringify(addBook)).then(() => {
          console.log('done');
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  }

}
