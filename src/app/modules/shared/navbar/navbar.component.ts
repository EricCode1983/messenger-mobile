import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input('NAV') set NAV(e) {
    this.title = e;
  }

  @Input('BACK') set BACK(e) {
    this.back = e;
  }

  @Input('LOGOUT') set LOGOUT(e) {
    this.logout = e;
  }

  public title;
  public back;
  public logout;

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() { }

  goBack() {
    this.navCtrl.pop();
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/signin').then(() => {
      console.log('Routed at: /signin');
    });
  }

}
