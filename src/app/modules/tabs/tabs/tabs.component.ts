import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MessageBank } from '../../../models/model';
import { SocketServiceService } from 'src/app/services/socket/socket-service.service';
import { Subscription } from 'rxjs';
import { Platform, ModalController } from '@ionic/angular';
import { ConfirmComponent } from '../../shared/popup/confirm/confirm.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    exitAppData = { name: 'Exit App', message: 'Do You Really Want To Exit?' };

    constructor(private chat: ChatService, private localStorageService: LocalStorageService, private socket: SocketServiceService, private platform: Platform, private modalCtrl: ModalController, private router: Router) { }

    ngOnInit() {
        // setInterval(() => {
        this.exit();
        this.localStorageService.allStorage().then(data => {
            this.socket.connect(JSON.parse(data.user).username);
            let bank = [];
            if (data.MessageBank) {
                bank = JSON.parse(data.MessageBank);
                bank.sort((a, b) => {
                    const x: any = new Date(b.msgTimeStamp);
                    const y: any = new Date(a.msgTimeStamp);
                    return x - y;
                });
            }
            // this.chat.recieveMsg({
            //     username: JSON.parse(data.user).username,
            //     date: bank.length ? new Date(bank[0].msgTimeStamp).toISOString() : new Date().toISOString()
            // }, JSON.parse(data.user).loginType).then(res => {
            //     if (JSON.parse(data.user).loginType === 'onshore' ? res._embedded.message.length : res._embedded.messageInbox.length) {
            //         const old = this.storeMsg(bank, JSON.parse(data.user).loginType === 'onshore' ? res._embedded.message : res._embedded.messageInbox);
            //         this.localStorageService.setItem('MessageBank', JSON.stringify(old)).then(() => {
            //             console.log('done');
            //         }).catch(err => {
            //             console.log(err);
            //         });
            //     }
            // }).catch(err => {
            //     console.log(err);
            // });
            // if (JSON.parse(data.user).loginType === 'onshore') {
            //     this.chat.getFriendReq(JSON.parse(data.user).username).then(res => {
            //         const locAddBook = data.AddressBook ? JSON.parse(data.AddressBook) : [];
            //         if (res.addressBooks.length !== locAddBook.length) {
            //             const tempArry = res.addressBooks.concat(locAddBook);
            //             const addBook = this.arrayUnique(tempArry);
            //             this.localStorageService.setItem('AddressBook', JSON.stringify(addBook)).then(() => {
            //                 console.log('done');
            //             }).catch(err => {
            //                 console.log(err);
            //             });
            //         }
            //     }).catch(err => {
            //         console.log(err);
            //     });
            // }
        }).catch(err => {
            console.log(err);
        });
        // }, 10000);
    }

    private exit() {
        this.subscription = this.platform.backButton.subscribeWithPriority(0, () => {
            if (this.router.url === '/tab/home') {
                this.confirmExitPopup('exit', this.exitAppData);
            }
            return;
        });
    }

    private async confirmExitPopup(chooseType, data): Promise<any> {
        const modal = await this.modalCtrl.create({
            component: ConfirmComponent,
            componentProps: { CHOOSE_TYPE: chooseType, DATA: data },
            cssClass: 'i_modal_full_view',
            showBackdrop: false
        });
        modal.onDidDismiss().then(res => {
            if (res.data) {
                const key = 'app';
                navigator[key].exitApp();
            }
        });
        return await modal.present();
    }

    arrayUnique(array) {
        const a = array.concat();
        for (let i = 0; i < a.length; ++i) {
            for (let j = i + 1; j < a.length; ++j) {
                if (a[i].friendUserCode === a[j].friendUserCode) {
                    a.splice(j--, 1);
                }
            }
        }
        return a;
    }

    setActiveTab() {
        this.exit();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    storeMsg(localArry, arry) {
        const bank = [];
        let old = [];
        arry.forEach(data => {
            const msg = {} as MessageBank;
            msg.msgTO = data.msgTo;
            msg.msgTimeStamp = new Date(data.msgDateTimestamp).toISOString();
            msg.msgTime = data.msgDateTimestamp;
            msg.msgFrom = data.msgFrom;
            // msg.msgTime = data.createdDate;
            msg.groupChatId = data.groupChatId;
            msg.msgContent = data.msgContent;
            // msg.msgStatus = data.msgStatus;
            msg.msgReceiveTime = new Date();
            bank.push(msg);
        });
        if (localArry) {
            old = bank.concat(localArry);
        } else {
            old = bank;
        }
        return old;
    }
}
