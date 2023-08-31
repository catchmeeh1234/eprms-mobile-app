import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-user-menu-profile',
  templateUrl: './user-menu-profile.component.html',
  styleUrls: ['./user-menu-profile.component.scss'],
})
export class UserMenuProfileComponent  implements OnInit {

  constructor(
    private router:Router,
    private actionSheetCtrl:ActionSheetController,
    private sessionStorageService:SessionStorageService,
    private navCtrl:NavController) { }

  ngOnInit() {}

  async presentUserProfile() {
    await this.router?.navigate(['user-profile']);

    // const actionSheet = await this.actionSheetCtrl.create({
    //   header: 'Actions',
    //   buttons: [
    //     {
    //       text: 'Profile',

    //       handler: () => this.onViewProfile()
    //     },
    //     {
    //       text: 'Logout',
    //       handler: () => this.onLogout()
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       data: {
    //         action: 'cancel',
    //       },
    //       handler: () => {
    //         console.log("cancel is clicked");
    //       }
    //     },
    //   ],
    // });

    // await actionSheet.present();
  }

  async onLogout() {
    const logout = this.sessionStorageService.removeSession();
    await this.router?.navigate(['login']);

  }

  async onViewProfile() {

  }
}
