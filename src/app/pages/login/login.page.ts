import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public username:string = "";
  public password:string = "";

  public isLoading:boolean = false;

  constructor(
    private router:Router,
    private menuCtrl:MenuController,
    private sessionStorageService:SessionStorageService,
    private toastCtrl:ToastController,
    private userService:UserService) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  async onLogin() {
    this.sessionStorageService.removeSession();

    if (this.username === "" && this.password === "") {
      this.presentToast("Please fill up username and password");
      return;
    }

    this.userService.getUser(this.username, this.password)
    .subscribe((res:any) => {
      this.isLoading = true;

      if (res.status === "Login Success") {
        //login success
        this.sessionStorageService.setSession("id", res.uid);
        this.sessionStorageService.setSession("division", res.division);
        this.sessionStorageService.setSession("access", res.access);
        this.sessionStorageService.setSession("fullname", res.fullname);
        this.sessionStorageService.setSession("isDarkMode", false);

        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.isLoading = false;
        this.presentToast("something went wrong/ incorrect username or password");
      }
    },
    (error) => {
      this.isLoading = false;
      // Handle login error
      console.log("Log in Error: " + error.message);
    });

    this.router.navigate(['/dashboard']);
    this.menuCtrl.enable(true);

  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000, // Duration in milliseconds
      position: 'bottom' // Position of the toast
    });
    toast.present();
  }

}
