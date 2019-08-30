import { Component, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private ngZone: NgZone,
        private router: Router,
        private localStorageService: LocalStorageService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        this.localStorageService.getItem('user').then(data => {
            this.ngZone.run(async () => {
                if (data) {
                    await this.router.navigateByUrl('/tab/home').then(() => {
                        console.log('Routed at: /tab/home');
                    });
                } else {
                    await this.router.navigateByUrl('/signin').then(() => {
                        console.log('Routed at: /signin');
                    });
                }
            });
        });
    }
}
