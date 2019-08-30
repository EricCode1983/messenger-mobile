import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { SocketServiceService } from 'src/app/services/socket/socket-service.service';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    public title = 'Log In';
    public user: any = {};
    public env = ['onshore', 'onboard'];
    public chatType: any;
    constructor(private authService: AuthService, private router: Router, private localStorageService: LocalStorageService, private common: CommonService, private socket: SocketServiceService) { }

    ngOnInit() { }

    login() {
        if (this.chatType) {
            this.common
                .presentLoading('Please Wait...')
                .then(_ => {
                    // if (this.chatType === 'onboard') {
                        // const key = 'loginStatus';
                        // this.user[key] = 'PENDING';
                        // this.socket.startConnection(this.user).then((res) => {
                        //     this.onBoardLogin(res);
                        // }).catch(err => {
                        //     console.log(err);
                        // });
                    // } else {
                        this.authService
                            .login(this.user, this.chatType)
                            .then(data => {
                                console.log(data);
                                const key = 'loginType';
                                data[key] = this.chatType;
                                // this.localStorageService.clear();
                                this.localStorageService.setItem('user', JSON.stringify(data));
                                this.common.dismiss();
                                this.router.navigateByUrl('/tab/home').then(() => {
                                    console.log('Routed at: /tab/home');
                                });
                            }).catch(err => {
                                console.log(err);
                                this.common._toastMsg(err.error.error_description);
                                this.common.dismiss();
                            });
                    // }
                })
                .catch(err => {
                    console.log(err);
                    this.common._toastMsg(err);
                    this.common.dismiss();
                });

        } else {
            this.common._toastMsg('Please Select Chat Type');
        }
    }

    onBoardLogin(userData: any) {
        this.socket.connectSocket(userData).then(data => {
            console.log(data);
            if (data.loginStatus === 'SUCCESS') {
                this.common.dismiss();
                // this.localStorageService.clear();
                const key = 'loginType';
                data[key] = this.chatType;
                this.localStorageService.setItem('user', JSON.stringify(data));
                this.router.navigateByUrl('/tab/home').then(() => {
                    console.log('Routed at: /tab/home');
                });
            } else if (data.loginStatus === 'PENDING') {
                setTimeout(() => {
                    this.onBoardLogin(userData);
                }, 2000);
            } else {
                this.common.dismiss();
                this.common._toastMsg(data.loginStatus);
            }
        }).catch(err => {
            this.common.dismiss();
            console.log(err);
        });
    }

    saveChat(type: string, value: any): void {
        if (type === 'chat') {
            this.chatType = value;
        }
    }
}
