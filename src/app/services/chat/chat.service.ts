import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  sendMsg(data: any, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = type === 'onboard' ? environment.BASEURL_OnShore + 'api/v1/onboard/messageOutbox' : environment.BASEURL_OnShore + 'api/v1/onshore/chat';
      this.http.post(url, data).toPromise().then((res: Response) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  recieveMsg(data: any, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = type === 'onboard' ? environment.BASEURL_OnShore + 'api/v1/onboard/messageInbox/search/msgTo?username=' + data.username + '&msgDateTimestamp=' + data.date : environment.BASEURL_OnShore + 'api/v1/onshore/message/search/msgTo?username=' + data.username + '&msgDateTimestamp=' + data.date;
      this.http.get(url).toPromise().then((res: Response) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  getFriendReq(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = environment.BASEURL_OnShore + 'api/v1/onshore/user/search/username?username=' + data + '&projection=address';
      this.http.get(url).toPromise().then((res: Response) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  // connect(data: any): Observable<any> {
  //   setInterval(() => {
  //     this.recieveMsg(data).then(res => {
  //       this.DATA = res;
  //     });
  //   }, 3000);
  //   return this.DATA;
  // }

  getUserList(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = environment.BASEURL_OnShore + 'api/v1/onshore/unFriendList/' + data;
      this.http.post(url, null).toPromise().then((res: Response) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  addFriend(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = environment.BASEURL_OnShore + 'api/v1/onshore/addressBook';
      this.http.post(url, data).toPromise().then((res: Response) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  confirmFriend(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const datas = {
        requestStatus: 'APPROVE'
      };
      const url = environment.BASEURL_OnShore + 'api/v1/onshore/addressBook/' + data.addressBookId;
      this.http.patch(url, datas).toPromise().then((res: Response) => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

}
