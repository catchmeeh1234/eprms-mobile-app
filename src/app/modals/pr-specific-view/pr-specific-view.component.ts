import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PrUpdateStatusService } from 'src/app/services/pr-update-status.service';
import { PrService } from 'src/app/services/pr.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-pr-specific-view',
  templateUrl: './pr-specific-view.component.html',
  styleUrls: ['./pr-specific-view.component.scss'],
})
export class PrSpecificViewComponent  implements OnInit {

  headerText;
  prNumber;

  displayedColumns: string[] = ['pr_items', 'pr_quantity', 'pr_unit', 'pr_cost'];
  public result:any;
  public prDetailsForm:FormGroup;

  //pr details
  public prequeststatus:string;
  public prequestdivision:string;

  public print_counter:string;
  public access = this.sessionStorageService.getSession("access");
  public division = this.sessionStorageService.getSession("division");

  public isShowApproveDisapprove: boolean = false;
  public isShowCancelled: boolean = false;
  public isShowReroute: boolean = false;

  constructor(
    private prService:PrService,
    private formBuilder:FormBuilder,
    private sessionStorageService:SessionStorageService,
    private modalCtrl:ModalController,
    private prUpdateStatus:PrUpdateStatusService) { }

  ngOnInit() {
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
          this.prDetailsForm.patchValue(prDetails);
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

  async onUpdateApproveStatus(stat:string, is_remarks_visible:boolean) {
    if (this.prNumber == null) {
      return;
    }

    // const modal = await this.modalCtrl.create({
    //   component: ConfirmationComponent,
    //   componentProps: {
    //     headerText: `Confirmation`,
    //     message: `Are you sure you want to ${stat}?`,
    //     isRemarksVisible: is_remarks_visible
    //   }
    // });

    // modal.present();

    // const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   // if (stat === "Re-route") {
    //   //   this.isBtnApproval = false;
    //   // } else {
    //   //   this.isBtnApproval = true;
    //   // }

    //   this.prUpdateStatus.updatePrRequest(this.prNumber, this.prequeststatus, stat, data.remarks, this.prequestdivision);
    //   setTimeout(() => {
    //     this.prService.loadPR()
    //     .subscribe((res:any) => {
    //       this.prService.dataSourcePRTable = res;
    //       this.close();
    //     });

    //     // this.prService.approvePr(this.division, this.access)
    //     // .subscribe((res:any) => {
    //       // this.document.dataSource = new MatTableDataSource(this.result);

    //       // this.document.dataSource.paginator = this.paginator;

    //     //});
    //   }, 500);

    // } else {
    //   return;
    // }
  }

}
