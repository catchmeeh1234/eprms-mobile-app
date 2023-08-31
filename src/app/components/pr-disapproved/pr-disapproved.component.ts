import { Component, OnInit } from '@angular/core';
import { PrService } from 'src/app/services/pr.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pr-disapproved',
  templateUrl: './pr-disapproved.component.html',
  styleUrls: ['./pr-disapproved.component.scss'],
})
export class PrDisapprovedComponent  implements OnInit {
  chart: any;

  private arrayDivisions:any = [];
  private arrayDisapprovePRCount:any = [];

  constructor(private prService:PrService) { }

  ngOnInit() {
    this.displayChart();
  }

  displayChart() {
    this.prService.getDivisions()
    .subscribe(data => {
      let result:any = data;
      for (const div of result) {
        this.arrayDivisions.push(div.division_name);
        this.prService.loadDisapprovePR(div.division_name)
        .subscribe((res:any) => {
          let count:any = res.length;
          this.arrayDisapprovePRCount.push(count);
        });
      }
    });

    setTimeout(() => {
      this.chart =  new Chart('disapprovedpr', {
        type: 'bar',
        data: {
          labels: this.arrayDivisions,
          datasets: [
            {
              label: 'Disapproved PR',
              data: this.arrayDisapprovePRCount,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                    size: 10,
                }
              }
            },
            x: {
              ticks: {
                font: {
                    size: 8,
                }
            }
            }
          },
        },
      });
    }, 1000);
  }
}
