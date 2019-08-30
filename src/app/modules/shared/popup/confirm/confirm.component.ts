import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  @Input() DATA: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss(bool) {
    this.modalCtrl.dismiss(bool);
  }
}
