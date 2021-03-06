import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private storage: AppState,
    private router: Router,
    private user: UserService,
    private toastController: ToastController,
    private firebase: Firebase
  ) { }

  async ngOnInit() {
    await this.firebase.setScreenName('login');
  }

  async login() {
    const toast = await this.toastController.create({
      message: `Неверный адрес электронной почты или пароль`,
      duration: 5000
    });

    let data: { token: string, user: any };
    try {
      data = await this.user.auth(this.username, this.password);
    } catch (e) {
      console.log(e);
      await toast.present();
      return;
    }

    console.log(this);
    await this.storage.setAsync('token', data.token);
    await this.router.navigateByUrl('/profile');
    await this.firebase.logEvent('login', { sign_up_method: 'email' });
    await this.firebase.setUserId(data.user.ud);
  }

  async gotoreg() {
    await this.router.navigateByUrl('/register');
  }
}
