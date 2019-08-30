import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ChatService } from 'src/app/services/chat/chat.service';
import { MessageBank } from '../../../models/model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { IonContent } from '@ionic/angular';
import { SocketServiceService } from 'src/app/services/socket/socket-service.service';

@Component({
  selector: 'app-convo',
  templateUrl: './convo.component.html',
  styleUrls: ['./convo.component.scss'],
})
export class ConvoComponent implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public title: any;

  public data: any;

  public message: any;

  msgBank = [];

  public userDetails: any;

  private DATA = {
    msgTimeStamp: null,
    msgFrom: null,
    msgTO: null,
    msgTime: null,
    groupChatId: null,
    msgContent: null,
    msgStatus: null,
    msgReceiveTime: null,
    msgReadTime: null,
    msgSubmitTime: null,
    msgDeliverTime: null,
    conversationId: null
  } as MessageBank;

  constructor(private chat: ChatService, private activatedroute: ActivatedRoute, private localStorageService: LocalStorageService, private socket: SocketServiceService) { }

  ngOnInit() {
    this.activatedroute.paramMap.subscribe(params => {
      this.title = params.get('title');
      this.data = {
        msgFrom: params.get('msgFrom'),
        msgTo: params.get('msgTo'),
        msgContent: null,
        msgDateTimestamp: null,
        messageBankId: params.get('groupChatId'),
        msgType: params.get('msgType'),
        groupChatId: params.get('groupChatId'),
        conversationId: params.get('groupChatId'),
        isMsgFromOnBoard: true
      };
    });
    this.localStorageService.allStorage().then(data => {
      this.msgBank = data.MessageBank ? JSON.parse(data.MessageBank) : [];
      this.userDetails = JSON.parse(data.user);
      this.filterChats();
      this.sortChat();
      this.ScrollToBottom();
      this.socket.recieveMsg(this.userDetails.username).subscribe(res => {
        const msg = {} as MessageBank;
        msg.conversationId = res.conversationId;
        msg.groupChatId = res.groupChatId;
        msg.msgContent = res.msgContent;
        msg.msgFrom = res.msgFrom;
        msg.msgTO = res.msgTo;
        msg.msgTimeStamp = res.msgDateTimestamp;
        this.msgBank.push(msg);
        this.store(msg);
        console.log(msg);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  sendMessage(data) {
    this.data.msgDateTimestamp = new Date();
    this.data.msgContent = data;
    this.data.isMsgFromOnBoard = this.userDetails === 'onboard' ? true : false;
    this.socket.sendMsg(this.data).then(res => {
      const msg = {} as MessageBank;
      msg.conversationId = res.conversationId;
      msg.groupChatId = res.groupChatId;
      msg.msgContent = res.msgContent;
      msg.msgFrom = res.msgFrom;
      // msg.msgStatus = res.
      msg.msgTO = res.msgTo;
      msg.msgTimeStamp = res.msgDateTimestamp;
      this.msgBank.push(msg);
      this.store(msg);
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    this.message = '';
    this.ScrollToBottom();
  }

  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }

  filterChats() {
    this.msgBank = this.msgBank.filter(item => item.msgTO === this.data.msgTo || item.msgFrom === this.data.msgTo);
  }

  store(msg) {
    this.localStorageService.getItem('MessageBank').then(res => {
      const bank = res ? JSON.parse(res) : [];
      bank.push(msg);
      this.localStorageService.setItem('MessageBank', JSON.stringify(bank)).then(() => {
        console.log('done');
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  sortChat() {
    this.msgBank.sort((a, b) => {
      const x: any = new Date(a.msgTimeStamp);
      const y: any = new Date(b.msgTimeStamp);
      return x - y;
    });
  }
}
