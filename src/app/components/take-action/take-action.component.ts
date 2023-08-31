import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-take-action',
  templateUrl: './take-action.component.html',
  styleUrls: ['./take-action.component.scss'],
})
export class TakeActionComponent  implements OnInit {
  @Input() prNum: any;

  constructor(private actionSheetCtrl:ActionSheetController) { }

  ngOnInit() {}

  async presentTakeAction(prno) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Approve PR',

          handler: () => this.onUpdateApproveStatus("test", true)
        },
        {
          text: 'Disapprove PR',
          handler: () => this.onUpdateApproveStatus("test", true)
        },
        {
          text: 'Edit PR',
          handler: () => this.onUpdateApproveStatus("test", true)
        },
        {
          text: 'Cancel PR',
          handler: () => this.onUpdateApproveStatus("test", true)
        },
        {
          text: 'Close',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
          handler: () => {
            console.log("cancel is clicked");
          }
        },
      ],
    });

    await actionSheet.present();
  }

  async presentTagPR(prNum) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Tag as Disapproved by GM',

          handler: () => this.onUpdateApproveStatus("test", true)
        },
        {
          text: 'Tag as Approved by GM',
          handler: () => this.onUpdateApproveStatus("test", true)
        },
        {
          text: 'Close',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
          handler: () => {
            console.log("cancel is clicked");
          }
        },
      ],
    });

    await actionSheet.present();
  }

  async onUpdateApproveStatus(stat:string, is_remarks_visible:boolean) {
    // if (this.prNumber == null) {
    //   return;
    // }

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
