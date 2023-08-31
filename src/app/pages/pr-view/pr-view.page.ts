import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { Subscription } from 'rxjs';
import { PrSpecificViewComponent } from 'src/app/modals/pr-specific-view/pr-specific-view.component';
import { PrService } from 'src/app/services/pr.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-pr-view',
  templateUrl: './pr-view.page.html',
  styleUrls: ['./pr-view.page.scss'],
})
export class PrViewPage implements OnInit, OnDestroy {
  headerText = "View PR";

  public result:any;

  displayedColumns: string[] = ['PR#', 'Requestor', 'Status', 'Action'];

  public role:string = this.sessionStorageService.getSession("access");
  public fullName:string = this.sessionStorageService.getSession("fullname");
  isLoading:boolean = false;
  private prSubscription:Subscription;
  currentPage = 1;

  public searchText:string;
  public divisions:any;
  constructor(
    public prService:PrService,
    private modalCtrl:ModalController,
    private sessionStorageService:SessionStorageService,
    private router:Router,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.loadPR_Details();
  }

  ngOnDestroy(): void {
    if (this.prSubscription) {
      this.prSubscription.unsubscribe();
    }
  }

  getInitials(fullName:string): string {
    const words = fullName.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
  }

  loadPR_Details(event?:any) {
    this.isLoading = true;

    this.prSubscription = this.prService.loadPR()
    .subscribe((data:any) => {
      this.prService.dataSourcePRTable = [...this.prService.dataSourcePRTable, ...data];

      this.prService.dataSourcePRTable = data;
      this.isLoading = false;

    });

    if (event) {
      event.target.complete(); // Complete the infinite-scroll event
    }
  }

  onSearch(e:any) {
    this.searchText = e.detail.value;
  }

  async viewpritems(selectedPrNO:string) {
    //await this.router.navigate(["purchase-request-info"]);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          pr_no: selectedPrNO
      }
    };

    await this.navCtrl.navigateForward(['purchase-request-info'], navigationExtras);
    // if (selectedPrNO == null) {
    //   return;
    // }

    // const modal = await this.modalCtrl.create({
    //   component: PrSpecificViewComponent,
    //   componentProps: {
    //     headerText: `PR Number: ${selectedPrNO}`,
    //     prNumber: selectedPrNO
    //   }
    // });

    // modal.present();

    // const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    // }
  }

  editPr() {

  }

}
