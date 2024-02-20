import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { Pasteurizacao } from 'src/models/Pasteurizacao';
import { Centrifugacao } from 'src/models/Centrifugacao';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stackedData: any;
  stackedOptions: any;

  dadosPasteurizacao!: Pasteurizacao;
  dadosCentrifugacao!: Centrifugacao;
  temperatura: number = 0;
  segundosFaltantes: number = 0;
  procedimento: string = '';
  quantidade: number = 0;
  tipo: string = '';
  gordura: number = 0;
  gorduraTotal: number = 0;
  gorduraDesejada: number = 0;
  leiteIntegralTotal: number = 0;
  leiteSemiTotal: number = 0;
  leiteDesnatadoTotal: number = 0;
  iogurte: number = 0;
  cremeDeLeite: number = 0;
  queijo: number = 0;

  constructor(private socketService: SocketIoService) {
    this.socketService.listenToServer('Pasteurizacao').subscribe((change) => {
      this.onChangePasteurizacao(change);
    });
    this.socketService.listenToServer('Centrifugacao').subscribe((change) => {
      this.onChangeCentrifugacao(change);
    });
  }

  onChangePasteurizacao(change: any) {
    this.dadosPasteurizacao = change;
    this.temperatura = this.dadosPasteurizacao.temperatura;
    this.segundosFaltantes = this.dadosPasteurizacao.segundosFaltantes;
    this.procedimento = this.dadosPasteurizacao.procedimento;
    this.quantidade = this.dadosPasteurizacao.quantidade;
    this.tipo = this.dadosPasteurizacao.tipo;

    console.log(change);

    switch (this.tipo) {
      case 'INTEGRAL':
        this.leiteIntegralTotal += this.quantidade;
        break;
      case 'SEMIDESNATADO':
        this.leiteSemiTotal += this.quantidade;
        break;
      case 'DESNATADO':
        this.leiteDesnatadoTotal += this.quantidade;
        break;
      case 'IOGURTE':
        this.iogurte += this.quantidade;
        break;
      case 'QUEIJO':
        this.queijo += this.quantidade;
        break;
        case "CREME DE LEITE":
         this.cremeDeLeite+=this.quantidade;
        break;
    }
  }

  onChangeCentrifugacao(change: any) {
    this.dadosCentrifugacao = change;
    this.temperatura = this.dadosCentrifugacao.temperatura;
    this.segundosFaltantes = this.dadosCentrifugacao.segundosFaltantes;
    this.procedimento = this.dadosCentrifugacao.procedimento;
    this.quantidade = this.dadosCentrifugacao.quantidade;
    this.tipo = this.dadosCentrifugacao.tipo;
    this.gordura = this.dadosCentrifugacao.gordura;
    this.gorduraTotal += this.gordura;

    if (
      this.dadosCentrifugacao.tipo == 'INTEGRAL' ||
      this.dadosCentrifugacao.tipo == 'IOGURTE' ||
      this.dadosCentrifugacao.tipo == 'QUEIJO'
    ) {
      this.gorduraDesejada = (this.quantidade / 100) * 3;
    } else if (this.dadosCentrifugacao.tipo == 'SEMIDESNATADO') {
      this.gorduraDesejada = this.quantidade / 100;
    } else if (this.dadosCentrifugacao.tipo == 'DESNATADO') {
      this.gorduraDesejada = (this.quantidade / 100) * 0.3;
    }

    console.log(change);
  }

  ngOnInit(): void {
    this.stackedData = {
      labels: ['January'],
      datasets: [
        {
          type: 'bar',
          label: 'Leite UHT integral',
          backgroundColor: '#630A3F',
          data: [this.leiteIntegralTotal],
        },
        {
          type: 'bar',
          label: 'Leite UHT semidesnatado',
          backgroundColor: '#7D094F',
          data: [this.leiteSemiTotal],
        },
        {
          type: 'bar',
          label: 'Iogurte',
          backgroundColor: '#2C0A63',
          data: [this.leiteDesnatadoTotal],
        },
        {
          type: 'bar',
          label: 'Creme de leite',
          backgroundColor: '#5C0A63',
          data: [this.cremeDeLeite],
        },
        {
          type: 'bar',
          label: 'Queijo',
          backgroundColor: '#630A3F',
          data: [this.queijo],
        },
        {
          type: 'bar',
          label: 'desnatado',
          backgroundColor: '#0C0A63',
          data: [this.iogurte],
        },
      ],
    };
    this.stackedOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: '#6b6b6b',
          },
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        x: {
          stacked: true,

          ticks: {
            color: '#6b6b6b',
          },
          grid: {
            color: '',
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: '',
          },
          grid: {
            color: '',
          },
        },
      },
    };
  }
}
