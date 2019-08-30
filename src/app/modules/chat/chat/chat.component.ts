import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public pendindRequest: any;
  tab = [
    // {
    //   name: 'Chats',
    //   active: true,
    //   type: 'chat'
    // },
    {
      name: 'Contacts',
      active: true,
      type: 'contacts'
    },
    {
      name: 'Users',
      active: false,
      type: 'users'
    }
  ];

  currentTab = this.tab[0];
  segments = [];
  segmentsChamp = [];
  isLoading = true;

  public title = 'Chat';

  public User;
  public userData: any;

  constructor(private localStorageService: LocalStorageService, private chat: ChatService) { }

  ngOnInit() {
    this.localStorageService.getItem('AddressBook').then(res => {
      this.pendindRequest = JSON.parse(res);
      console.log(JSON.parse(res));
    }).catch(err => {
      console.log(err);
    });
    // setInterval(() => {
    this.localStorageService.allStorage().then(res => {
      if (res.AddressBook) {
        res.AddressBook = JSON.parse(res.AddressBook);
      }
      res.user = JSON.parse(res.user);
      this.userData = res;
      this.chat.getUserList(res.user.username).then(data => {
        this.User = data;
        console.log(data);
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
    // }, 10000);

    // this.localStorageService.getItem('user').then(res => {
    //   const userData = JSON.parse(res);
    // }).catch(err => {
    //   console.log(err);
    // });
  }

  changeTab(event) {
    this.currentTab = event;
    // if (this.isDataLoaded[this.currentTab.type] === false) {
    //   this.getAchievementsList(this.currentTab.type);
    // }
    // if (event.name === 'certificates') {
    //   this.analyticsServ.logEvent('achievements_page_click_certificates', {});
    // }
    // if (event.name === 'levels') {
    //   this.analyticsServ.logEvent('achievements_page_click_levels', {});
    // }
    // if (event.name === 'certificates') {
    //   this.analyticsServ.logEvent('achievements_page_click_certificates', {});
    // }
    // if (event.name === 'champs') {
    //   this.analyticsServ.logEvent('achievements_page_click_champs', {});
    // }
  }

}
