import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from './services/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: 'dashboard', icon: 'mail' },
    { title: 'View PR', url: 'pr-view', icon: 'paper-plane' },
    //{ title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public systemName:string = environment.SYSTEM_NAME;
  public companyName:string = environment.COMPANY_NAME;
  public fullName:string = this.sessionStorageService.getSession("fullname");

  constructor(private sessionStorageService:SessionStorageService) {}
}
