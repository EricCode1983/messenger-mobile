import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public user: any = {};
    public title = 'Register';
    public signupform: FormGroup;
    constructor(private keyboard: Keyboard, private formBuilder: FormBuilder, private authService: AuthService, private common: CommonService, private localStorageService: LocalStorageService, private router: Router) {
        const EMAILPATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        this.signupform = this.formBuilder.group({
            username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]*$/i), Validators.minLength(2), Validators.maxLength(20)]),
            displayName: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-z][a-zA-Z\\s]*/), Validators.minLength(2), Validators.maxLength(30)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
            email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
            phone: new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/i)])
        });
    }

    ngOnInit() {
        this.user.gender = 'male';
    }

    registerUser() {
        this.common.presentLoading('Please Wait!').then(() => {
            const key = 'roles';
            this.user[key] = [`${environment.BASEURL_OnShore}/api/v1/onshore/role/1`];
            this.authService.register(this.user).then(data => {
                this.localStorageService.setItem('userData', JSON.stringify(this.user)).then(() => {
                    this.signupform.reset();
                    this.common.dismiss();
                    this.common._toastMsg('User Register Successfully');
                    setTimeout(() => {
                        this.router.navigateByUrl('/signin').then(() => {
                            console.log('Routed at: /signin');
                        });
                    }, 2000);
                });
            }).catch(err => {
                if (err.error.message) {
                    this.common.dismiss();
                    console.log(err.error.message);
                    this.common._toastMsg(err.error.message);
                } else {
                    this.common.dismiss();
                    this.common._toastMsg('something went wrong');
                }
            });
        });
    }

    radioChecked(data) {
        this.user.gender = data;
    }

    onBlurMethod() {
        this.keyboard.hide();
    }
}
