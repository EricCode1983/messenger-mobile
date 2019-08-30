import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'friend-chat',
  templateUrl: './friend-chat.component.html',
  styleUrls: ['./friend-chat.component.scss'],
})
export class FriendChatComponent implements OnInit {

  USERS = [];

  @Input() data: any;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    // setInterval(() => {
      this.localStorageService.allStorage().then(res => {
        if (res.AddressBook) {
          JSON.parse(res.AddressBook).forEach(element => {
            if (element.requestStatus === 'APPROVE') {
              this.USERS.push(element);
            }
          });
        }
      }).catch(err => {
        console.log(err);
      });
    // }, 3000);
  }

}
