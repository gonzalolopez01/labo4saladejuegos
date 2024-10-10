import { sequence } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-simon',
  standalone: false,  
  templateUrl: './simon.component.html',
  styleUrl: './simon.component.css'
})
export class SimonComponent {
  moves: number[] = [];
  totalMoves: number = 0;
  message: string = 'Haz clic en comenzar';
  isPlayerTurn: boolean = false;
  cells: HTMLElement[] = [];

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
  illuminate(cellPos: number, time: number) {
    setTimeout(() => {
      const cell = document.querySelector(`.cell[pos="${cellPos}"]`) as HTMLElement;
      if (cell) {
        cell.classList.add('active'); // Añadir la clase 'active'
        setTimeout(() => {
          cell.classList.remove('active'); // Quitar la clase 'active' después de 300ms
        }, 300);
      }
    }, time);
  }
  setMoves(current: number) {
    this.moves.push(Math.floor(Math.random() * 4) + 1);
    if (current < this.totalMoves) {
      this.setMoves(++current);
    }
  }

  startGame() {
    this.moves = [];
    this.totalMoves = 2;
    this.message = 'Simón dice';
    this.isPlayerTurn = false;
    this.sequence();
  }

  sequence() {
    this.moves = [];
    this.setMoves(1);
    this.message = 'Simón dice';
    this.isPlayerTurn = false;

    for (let i = 0; i < this.moves.length; i++) {
      this.illuminate(this.moves[i], 600 * i);
    }

    setTimeout(() => {
      this.message = 'Repite la secuencia';
      this.isPlayerTurn = true;
    }, 600 * this.moves.length);
  }

  cellClick(cellPos: number) {
    if(!this.isPlayerTurn){
      return; //si no es turno del jugadore, no hacer nada
    }
    this.illuminate(cellPos, 0);

    if (this.moves && this.moves.length) {
      if (this.moves[0] === cellPos) {
        this.moves.shift();

        if (!this.moves.length) {
          this.totalMoves++;
          this.isPlayerTurn = false;
          setTimeout(() => {
            this.sequence();
          }, 1000);
        }
      } else {
        this.message = 'GAME OVER';
        this.isPlayerTurn= false;
        setTimeout(() => {
          this.message = 'Haz clic en comenzar';
        }, 1000);
      }
    }
  }
}
