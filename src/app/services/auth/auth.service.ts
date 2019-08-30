import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    register(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = environment.BASEURL_OnShore + 'api/v1/onshore/user';
            this.http
                .post(url, data)
                .toPromise()
                .then((res: Response) => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    login(data: any, type: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = type === 'onboard' ? environment.BASEURL_OnShore + 'oauth/token' : environment.BASEURL_OnShore + 'oauth/token';
            const header = new HttpHeaders({
                Authorization: 'Basic b25zaG9yZWp3dGNsaWVudGlkOlhWWWFtTk9wVXIxMDA=',
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            this.http
                .post(url,
                    'grant_type=' + encodeURIComponent('password') + '&username=' + encodeURIComponent(data.username) + '&password=' + encodeURIComponent(data.password),
                    { headers: header })
                .toPromise()
                .then((res: Response) => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}
