import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';

const backEnd = 'http://localhost:3000';  // Remova '/ws://'

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private clientSocket: socketIo.Socket;

  constructor() { 
    this.clientSocket = socketIo.connect(backEnd);
  }

  listenToServer(connection: string): Observable<any> {
    return new Observable(observer => {
      this.clientSocket.on(connection, (data: any) => {
        console.log(data)
        observer.next(data);
      });
    });
  }
}