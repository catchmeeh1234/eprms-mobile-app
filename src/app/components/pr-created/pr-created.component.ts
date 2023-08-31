import { Component, OnInit } from '@angular/core';
import { PrService } from 'src/app/services/pr.service';

@Component({
  selector: 'app-pr-created',
  templateUrl: './pr-created.component.html',
  styleUrls: ['./pr-created.component.scss'],
})
export class PrCreatedComponent  implements OnInit {

  public dashCard:any[] = [];

  chart: any;

  constructor(private prService:PrService) {}

  ngOnInit() {
    this.onLoadDivisionsDashCard();
  }


  lightenColor(hex, amount): string {
    if (amount === 100) {
      return hex;
    }
    // Remove the '#' symbol if present
    hex = hex.replace('#', '');

    // Convert the hexadecimal to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Lighten the color by the specified amount
    const lightenedR = Math.floor(r + (255 - r) * (amount / 100));
    const lightenedG = Math.floor(g + (255 - g) * (amount / 100));
    const lightenedB = Math.floor(b + (255 - b) * (amount / 100));

    // Convert the lightened RGB values back to hexadecimal
    const lightenedHex = `#${(lightenedR.toString(16)).padStart(2, '0')}${(lightenedG.toString(16)).padStart(2, '0')}${(lightenedB.toString(16)).padStart(2, '0')}`;
    return lightenedHex;
  }

  onLoadDivisionsDashCard() {
    let result:Division[];

    this.prService.getDivisions()
    .subscribe(
      {
        next: (res:Division[]) => {
          result = res;
        },

        error: (err: any) => { },
        complete: () => {
          let colorShadeIncrement = 100 / (result.length * 2);

          for (const div of result) {
            const iteration = 100 / (result.length * 2);
            const divisionName:string = div.division_name;
            const division_color_code:string = div.division_color_code;
            const lightenedColor = this.lightenColor(division_color_code, colorShadeIncrement); // Specify the desired lightening amount
            colorShadeIncrement += iteration;
            this.prService.loadDocumentCounter(divisionName)
            .subscribe((data:any) => {
              let count_documents:any = data;
              let object = {colorDark: lightenedColor, colorLight: division_color_code, number: count_documents, title: divisionName, icon: 'account_circle'}
              this.dashCard.push(object);
            },
            (error:any) => {
              console.log(error);
            }
            );
          }
        }
      }
    );
  }
}

export type Division = {
  division_name: string
  division_color_code:string
};

export type Pr_details = {
  prDetails_id: string
  pr_dateCreated: string
  pr_requestor: string
  pr_designation: string
  pr_division: string
  pr_purpose: string
  pr_status: string
  timestamp?: string
  remarks?: string
};
