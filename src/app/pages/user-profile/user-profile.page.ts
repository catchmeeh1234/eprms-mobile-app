import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  sessionData;
  public themeToggle:any;

  constructor(
    private sessionStorageService:SessionStorageService,
    private theme:ThemeService,
    private modalCtrl:ModalController,
    private router:Router
  ) { }

  ngOnInit() {
    this.sessionData = this.sessionStorageService.getSessionData();

    this.themeToggle = this.sessionStorageService.getSession("isDarkMode");
  }

  toggleChange(event:any) {
    this.sessionStorageService.setSession("isDarkMode", this.themeToggle);
    this.theme.toggleDarkTheme(event.detail.checked);
  }

  logout() {
    this.sessionStorageService.removeSession();
    this.theme.initializeDarkTheme(false);
    this.router.navigate(["./login"]);
  }
}
