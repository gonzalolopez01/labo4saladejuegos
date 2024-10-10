import { sequence } from '@angular/animations';
import { Component } from '@angular/core';
import { PuntajesService } from '../../../../services/puntajes.service';

@Component({
  selector: 'app-simon',
  standalone: false,  
  templateUrl: './simon.component.html',
  styleUrl: './simon.component.css'
})
export class SimonComponent {
  movimientos: number[] = [];
  totalMovimientos: number = 0;
  mensaje: string = 'Haz clic en comenzar';
  isPlayerTurn: boolean = false;
  cells: HTMLElement[] = [];

  puntaje = 0;
  restartDisabled = false;
  cargandoJuego = true;
  
  constructor(private puntajeService:PuntajesService){
    setTimeout(() => {
      this.cargandoJuego = false; // Cuando termine la tarea, ocultar el spinner
    }, 2000); 
  }

  ngAfterViewInit() {
    this.cells = Array.from(document.getElementsByClassName('cell')) as HTMLElement[];
  }

  // illuminate(cellPos: number, time: number) {
  //   setTimeout(() => {
  //     const cell = document.querySelector(`.cell[pos="${cellPos}"]`);
  //     cell?.classList.add('active');
  //     setTimeout(() => {
  //       cell?.classList.remove('active');
  //     }, 300);
  //   }, time);
  // }
  illuminate(cellPos: number, time: number) {//ilumina
    setTimeout(() => {
      const cell = document.querySelector(`.cell[pos="${cellPos}"]`) as HTMLElement;
      if (cell) {
        cell.classList.add('active'); //clase active
        setTimeout(() => {
          cell.classList.remove('active'); //se la saco despues de 300ms
        }, 300);
      }
    }, time);
  }
  setMoves(current: number) {//guarda la cantidad de moves al azar que le digas
    this.movimientos.push(Math.floor(Math.random() * 4) + 1);//guarda numero al azar 1 a 4 en el array
    if (current < this.totalMovimientos) {
      this.setMoves(++current);
    }
  }

  startGame() {
    this.movimientos = [];
    this.totalMovimientos = 2;
    this.mensaje = 'Simón dice';
    this.isPlayerTurn = false;
    this.restartDisabled = true;
    this.sequence();
  }

  sequence() {
    this.movimientos = [];
    this.setMoves(1);
    this.mensaje = 'Simón dice';
    this.isPlayerTurn = false;

    for (let i = 0; i < this.movimientos.length; i++) {
      this.illuminate(this.movimientos[i], 600 * i);//ilumina las celdas guardadas
    }

    setTimeout(() => {
      this.mensaje = 'Tu turno';
      this.isPlayerTurn = true;
    }, 600 * this.movimientos.length);
  }

  cellClick(cellPos: number) {
    if(!this.isPlayerTurn){
      return; //si no es turno del jugadore, no hacer nada
    }
    this.illuminate(cellPos, 0);

    if (this.movimientos && this.movimientos.length) {
      if (this.movimientos[0] === cellPos) {
        this.movimientos.shift();
        this.puntaje++;
        if (!this.movimientos.length) {
          this.totalMovimientos++;
          this.isPlayerTurn = false;
          setTimeout(() => {
            this.sequence();
          }, 1000);
        }
      } else {
        this.mensaje = 'GAME OVER';
        this.isPlayerTurn= false;
        // setTimeout(() => {
        //   this.message = 'Haz clic en comenzar';
        // }, 1000);
        setTimeout(() => {          
          this.guardarPuntaje();
          this.mensaje = 'Haz clic en comenzar';
         }, 1000); 
      }
    }
  }
  async guardarPuntaje() {
    try {
      await this.puntajeService.guardarResultado('Simón dice', this.puntaje);
      console.log('Resultado guardado');      
      this.restartDisabled = false;
    } catch (error) {
      console.error('Error al guardar puntaje: ', error);
      this.restartDisabled = false;
    }
  }
}
