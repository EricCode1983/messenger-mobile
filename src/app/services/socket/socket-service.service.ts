import { Injectable } from '@angular/core';
import { StompService } from 'ng2-stomp-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AddressBook } from 'src/app/models/model';

@Injectable({
    providedIn: 'root'
})
export class SocketServiceService {
    private DATA = {
        addressBookContactId: null,
        friendUserCode: null,
        friendDisplayName: null,
        contactMethod: null,
        friendBlock: null,
        requestStatus: null
    } as AddressBook;
    public isCurrentMarketStatsSubscribed: any;
    private currentMarketStatsSubject = new Subject<any>();

    public userRequestSubscribed: any;
    public userRequestApprovalSubscribed: any;

    constructor(private localStorageService: LocalStorageService, private http: HttpClient, private stomp: StompService) { }

    startConnection(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = environment.BASEURL_Onbord + 'api/v1/onboard/loginUser';
            const header = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
            this.http
                .post(url, data, {
                    headers: header
                })
                .toPromise()
                .then((res: Response) => {
                    console.log(res);
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    connectSocket(data: any): Promise<any> {
        console.log(data);

        return new Promise((resolve, reject) => {
            this.http.get(environment.BASEURL_Onbord + 'oauth/token').toPromise().then((res: Response) => {
                resolve(res);
                // const promArry = [];
                // const key = 'loginStatus';
                // if (res[key] === 'PENDING') {
                //     setTimeout(() => {
                //         const p = this.connectSocket(data);
                //         promArry.push(p);

                //     }, 5000);
                // } else {
                //     console.log('aya');
                // }
            }).catch(err => {
                reject(err);
            });
        });
    }

    async connect(userData: any, sendMsg?: any) {
        // Configuration
        this.stomp.configure({
            host: environment.BASEURL_OnShore + 'message-socket-connect',
            debug: false,
            queue: {
                init: false,
                user: true
            }
        });

        // Start Connection
        await this.stomp.startConnect().then(() => {
            console.log('%c Connection Open!', 'font-size: 31px; color: #bada55');
            this.stomp.done('init');
        });
    }

    disconnect() {
        this.stomp.disconnect().then(() => {
            console.log('%c Connection Closed!', 'font-size: 31px; color: #bada55');
        });
    }

    recieveMsg(userdata: any): Observable<any> {
        return new Observable(obs => {
            this.stomp.subscribe(`/queue/topic/${userdata}/specific-user`, data => {
                obs.next(data);
            });
        });
    }

    sendMsg(sendData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.stomp.send('/api/v1/secure/onshore/chat', sendData);
            resolve(sendData);
        });
    }

    requestApproval(userData: any): Observable<any> {
        return new Observable(obs => {
            this.stomp.subscribe(`/queue/topic/${userData}/user-approval`, (data) => {
                if (data.msgType === 'FRIEND_APPROVAL_ALERT') {
                    this.stomp
                        .send('/api/v1/secure/onshore/notified', {
                            addressBookContactId: data.addressBookContactId,
                            msgType: data.msgType
                        });
                    obs.next(data);
                }
            });
        });
    }

    recieveRequest(userData: any): Observable<any> {
        return new Observable(obs => {
            this.stomp.subscribe(`/queue/topic/${userData}/user-request`, (data) => {
                if (data.msgType === 'FRIEND_REQUEST_ALERT') {
                    this.stomp
                        .send('/api/v1/secure/onshore/notified', {
                            addressBookContactId: data.addressBookContactId,
                            msgType: data.msgType
                        });
                    obs.next(data);
                }
            });
        });
    }

    // async connectOnboard(loginData: any) {

    // }


}
