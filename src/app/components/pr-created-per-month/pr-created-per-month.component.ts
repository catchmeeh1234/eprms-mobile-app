import { Component, OnInit } from '@angular/core';
import { PrService } from 'src/app/services/pr.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pr-created-per-month',
  templateUrl: './pr-created-per-month.component.html',
  styleUrls: ['./pr-created-per-month.component.scss'],
})
export class PrCreatedPerMonthComponent  implements OnInit {

  private lineChart: Chart;
  public Total:any = [];

  constructor(private prService:PrService) { }

  ngOnInit() {
    setTimeout(() => {
      this.createLineChart();
    },500)

    this.prService.PRTotalJan()
    .subscribe(data => {
      let result:any = data;
      this.Total = result;
      //console.log(this.Total)
    });
  }

  createLineChart() {
    let totaldata = [];
    for (const div of this.Total) {
      const prmonth:string = div.month;
      const prtotal:any = div.total;
      totaldata.push(prtotal);
    };

    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August","September",'October','November','December'],
        datasets: [{
          label: 'Total',
          data: totaldata,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }]
      },
    });
  }
}
