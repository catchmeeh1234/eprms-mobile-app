import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, MenuController, ModalController, NavParams } from '@ionic/angular';
import { PrUpdateStatusService } from 'src/app/services/pr-update-status.service';
import { PrService } from 'src/app/services/pr.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-purchase-request-info',
  templateUrl: './purchase-request-info.page.html',
  styleUrls: ['./purchase-request-info.page.scss'],
})
export class PurchaseRequestInfoPage implements OnInit, OnDestroy {
  public prNumber:string = "";

  displayedColumns: string[] = ['pr_items', 'pr_quantity', 'pr_unit', 'pr_cost'];
  public result:any;
  public pr_items:any;
  public prDetailsForm:FormGroup;
  public showDownArrow:string;

  //pr details
  public prequeststatus:string;
  public prequestdivision:string;
  public prTitle:string = "";

  public print_counter:string;
  public access = this.sessionStorageService.getSession("access");
  public division = this.sessionStorageService.getSession("division");

  public isShowApproveDisapprove: boolean = false;
  public isShowCancelled: boolean = false;
  public isShowReroute: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private menuCtrl:MenuController,
    private prService:PrService,
    private formBuilder:FormBuilder,
    private sessionStorageService:SessionStorageService,
    private modalCtrl:ModalController,
    private prUpdateStatus:PrUpdateStatusService,
    ) {
      this.route.queryParams.subscribe((params:any) => {
        this.prNumber = params["pr_no"];
      });
    }

  ngOnInit() {
    this.menuCtrl.enable(false);

    // init formgroup
    this.prDetailsForm = this.formBuilder.group({
      pr_purpose: ['', Validators.required],
      remarks: [''],
      pr_status: ['', Validators.required],
      pr_dateCreated: ['', Validators.required],
      pr_requestor: ['', Validators.required]
    });
    this.prDetailsForm.disable();
    this.loadPRDetails(this.prNumber);

  }

  ngOnDestroy(): void {
    this.menuCtrl.enable(true);
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  loadPRDetails(prno) {
    //this.prnumber = prNumber;
    this.prService.loadPrAndItems(prno)
    .subscribe((res:any) => {
      console.log(res);
      if (res.length === 1) {
        this.result = res;
        //populate the form input with data from the database
        for (const prDetails of res) {
          this.prequeststatus = prDetails.pr_status;
          this.prequestdivision = prDetails.pr_division;
          this.print_counter = prDetails.print_counter;
          this.prTitle = prDetails.pr_title;

          this.prDetailsForm.patchValue(prDetails);
          this.pr_items = prDetails.items;

          //check if pr items has subitems
          if (prDetails.items.length === 0) {

            this.showDownArrow = "none";
          } else {
            this.showDownArrow = "chevron-down";
          }
        }

      }


      setTimeout(() => {
        this.checkApproveDisapproveButton();
        this.checkCancelButton();
        this.checkReroute();

      }, 0);
    });
  }


  async viewHistoryPR(prno) {
    if (prno == null) {
      return;
    }

    // const modal = await this.modalCtrl.create({
    //   component: PrHistoryComponent,
    //   componentProps: {
    //     headerText: `PR History(${prno})`,
    //     prNumber: prno
    //   }
    // });

    // modal.present();

    // const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {

    // }
  }

  checkApproveDisapproveButton() {
    if (this.access === 'Encoder') {
      console.log(1);
      return this.isShowApproveDisapprove = false;
    }
    if(this.access === 'Approver' && this.division == this.prequestdivision && this.prequeststatus === 'For DM Approval') {
      console.log(3);
      return this.isShowApproveDisapprove = true;
    }
    if(this.access === 'Budget' && this.prequeststatus === 'For Budget Checking') {
      console.log(4);
      return this.isShowApproveDisapprove = true;
    }
    if(this.access === 'Cash' && this.prequeststatus === 'For Cash Allocation') {
      console.log(5);
      return this.isShowApproveDisapprove = true;
    }
    if(this.prequeststatus === 'Disapprove') {
      console.log(6);
      return this.isShowApproveDisapprove = false;
    }
    if(this.prequeststatus === 'Cancelled') {
      console.log(7);
      return this.isShowApproveDisapprove = false;
    }
  }

  checkCancelButton() {
    if (this.access === 'Encoder' && this.division === this.prequestdivision && this.prequeststatus !== 'Cancelled' && this.prequeststatus !== 'For Printing' && !this.prequeststatus.includes("Disapprove")) {
      return this.isShowCancelled = true;
    } else {
      return this.isShowCancelled = false;
    }
  }

  checkReroute() {
    if (this.access != 'Encoder' && this.prequeststatus !== 'For DM Approval' && this.prequeststatus !== 'Cancelled' && !this.prequeststatus.includes("Disapprove")) {
      if (this.access === 'Budget' && this.prequeststatus === 'For Budget Checking') {
        return this.isShowReroute = true;
      }
      if(this.access === 'Cash' && this.prequeststatus === 'For Cash Allocation') {
        return this.isShowReroute = true;
      }
      //for GM
      if(this.prequeststatus === 'For Printing') {
        return this.isShowReroute = true;
      }
      return this.isShowReroute = false;
    } else {
      return this.isShowReroute = false;
    }
  }

}
