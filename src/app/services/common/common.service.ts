import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor(private loadingController: LoadingController, private toastCtrl: ToastController) { }

    async presentLoading(msg) {
        const loading = await this.loadingController.create({
            message: msg
        });
        await loading.present();

        // const { role, data } = await loading.onDidDismiss();

        // console.log('Loading dismissed!');
    }

    dismiss() {
        this.loadingController.dismiss();
    }

    async _toastMsg(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

}
