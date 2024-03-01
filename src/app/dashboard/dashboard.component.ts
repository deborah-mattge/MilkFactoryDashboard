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
  procedimento: string = 'Em Espera...';
  quantidade: number = 0;
  tipo: string = '';
  gordura: string = "";
  gorduraTotal: string = "";
  gorduraDesejada: string = "";
  leiteIntegralTotal: number = 0;
  leiteSemiTotal: number = 0;
  leiteDesnatadoTotal: number = 0;
  iogurte: number = 0;
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
    this.gordura = "0";
    this.gorduraDesejada = "0";
    this.gorduraTotal = "0";

  }
  
  onChangeCentrifugacao(change: any) {
    this.dadosCentrifugacao = change;
    this.temperatura = this.dadosCentrifugacao.temperatura;
    this.segundosFaltantes = this.dadosCentrifugacao.segundosFaltantes;
    this.procedimento = this.dadosCentrifugacao.procedimento;
    this.quantidade = this.dadosCentrifugacao.quantidade;
    this.tipo = this.dadosCentrifugacao.tipo;
    this.gordura = this.dadosCentrifugacao.gordura.toFixed(2);
    this.gorduraDesejada = this.dadosCentrifugacao.gorduraUsada.toFixed(2);
    this.gorduraTotal = this.dadosCentrifugacao.totalGordura.toFixed(2);
    if(this.segundosFaltantes == 0){
      if(this.tipo ==  'INTEGRAL'){
        this.leiteIntegralTotal += this.quantidade;
      }
      if(this.tipo ==  'SEMIDESNATADO'){
        this.leiteSemiTotal += this.quantidade; 
      }
      if(this.tipo ==  'DESNATADO'){
        this.leiteDesnatadoTotal += this.quantidade;
      }
      if(this.tipo ==  'IOGURTE'){
        this.iogurte += this.quantidade;
      }
      if(this.tipo ==  'QUEIJO'){
        this.queijo += this.quantidade;
      }
      this.setData();
    }
    setTimeout(() => {
      this.gordura = "0";
      this.gorduraDesejada = "0";
      this.gorduraTotal = "0";
      this.segundosFaltantes = 0;
      this.quantidade = 0;
      this.procedimento = "Em Espera..."
       this.temperatura = 0;
     }, 100000);
  }


  setData():void{
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
          label: 'Queijo',
          backgroundColor: '#7D0929',
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
  }

  ngOnInit(): void {
    this.setData()
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
