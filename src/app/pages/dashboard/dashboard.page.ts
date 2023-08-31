import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private isDark:any = JSON.parse(this.sessionStorageService.getSession("isDarkMode"));

  headerText = 'Dashboard';

  constructor(
    private sessionStorageService:SessionStorageService,
    private theme:ThemeService
    ) { }

  ngOnInit() {
  //  if (this.isDark === null) {
  //   console.log("null");
  //   this.sessionStorageService.setSession("isDarkMode", true);
  //  } else {
  //   console.log("not null")
  //  }

    //this.sessionStorageService.setSession("")
    this.theme.initializeDarkTheme(this.isDark);

  }
}
