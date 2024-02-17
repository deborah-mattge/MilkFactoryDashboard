import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stackedData: any;
  stackedOptions: any;



  constructor() { }

  ngOnInit(): void {
    this.stackedData = {
      labels: ['January'],
      datasets: [{
          type: 'bar',
          label: 'Leite UHT integral',
          backgroundColor: '#630A3F',
          data: [
              50
              
          ]
      }, {
          type: 'bar',
          label: 'Leite UHT semidesnatado',
          backgroundColor: '#7D094F',
          data: [
              21
          ]
      }, 
      {
        type: 'bar',
        label: 'Iogurte',
        backgroundColor: '#2C0A63',
        data: [
            21
        ]
    },
    {
      type: 'bar',
      label: 'Creme de leite',
      backgroundColor: '#5C0A63',
      data: [
          21
      ]
  },
  {
    type: 'bar',
    label: 'Queijo',
    backgroundColor: '#630A3F',
    data: [
        21
    ]
},{
          type: 'bar',
          label: 'desnatado',
          backgroundColor: '#0C0A63',
          data: [
              41
          ]
      }]
  };
  this.stackedOptions = {
    indexAxis: 'y',
    plugins: {
        legend: {
            labels: {
                color: '#6b6b6b'
            }
        },
        tooltips: {
            mode: 'index',
            intersect: false
        }
    },
    scales: {
        x: {
            stacked: true,
            
            ticks: {
                color: '#6b6b6b'
            },
            grid: {
                color: ''
            }
        },
        y: {
            stacked: true,
            ticks: {
                color: ''
            },
            grid: {
                color: ''
            }
        }
    }
};

  }

}
