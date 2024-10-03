import { Component, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../../services/preguntados.service';
import { withInMemoryScrolling } from '@angular/router';
import { compileComponentClassMetadata } from '@angular/compiler';

@Component({
  selector: 'app-crucigrama',
  standalone: false,  
  templateUrl: './crucigrama.component.html',
  styleUrl: './crucigrama.component.css'
})
export class CrucigramaComponent implements OnInit{

  tablero: string[][] = [];
  tam: number = 15;
  jugando = false;
  direccion = 'H';

  palabras = [
    // {palabra: 'angular', fila: 1, columna: 1, direccion: 'H', pista: 'Framework para crear aplicaciones web.'},
    // {palabra: 'typescript', fila: 3, columna: 1, direccion: 'V', pista: 'Lenguaje de programación que mejora JavaScript.'},
    // {palabra: 'crucigrama', fila: 5, columna: 5, direccion: 'H', pista: 'Juego de palabras que se cruzan.'},
    'ALBANIA','ALEMANIA','ANDORRA','AUSTRIA','BELARUS','BELGICA','BULGARIA','CHIPRE',
    'CROACIA', 'DINAMARCA', 'ESLOVAQUIA', 'ESLOVENIA','ESPAÑA','ESTONIA','FINLANDIA',
    'FRANCIA','GRECIA','HUNGRIA','IRLANDA','ISLANDIA','ITALIA','LETONIA','LIECHTENSTEIN',
    'LITUANIA','LUXEMBURGO','MACEDONIA','MALTA','MOLDOVA','MONACO','MONTENEGRO',
    'NORUEGA', 'PAISES BAJOS','POLONIA','PORTUGAL','INGLATERRA','GALES','ESCOCIA','RUMANIA',
    'RUSIA','SERBIA', 'SUECIA','SUIZA','TURQUIA','UCRANIA','VATICANO',
    'ARGENTINA','ARUBA','BAHAMAS','BARBADOS','BELICE','BOLIVIA','BRASIL','CANADA','CHILE',                                                   
    'COLOMBIA','CUBA','DOMINICA','ECUADOR','GRANADA','GUATEMALA','GUYANA','HAITI','HONDURAS',                                                
    'JAMAICA','MEXICO','NICARAGUA','PANAMA','PARAGUAY','PERU','URUGUAY'                                                
  ];

  constructor() { }

  ngOnInit(): void {
    // this.inicializarTablero();
    // this.colocarPalabras();
  }

  inicializarTablero(): void {
    // crear un tablero vacio con espacios en blanco
    this.tablero = Array(this.tam).fill(null).map(() => Array(this.tam).fill(''));    
  }

  // colocarPalabras(): void {
  //   let direccion = 'H';      
  //   this.palabras.forEach(palabraObj => {
  //     const palabra = palabraObj.palabra;    
  //     let fila = Math.floor(Math.random() * 15);
  //     let columna = Math.floor(Math.random() * 15);      
  //     let entra;
  //     //busco posicion para que la palabra entre
  //     do {        
  //       if(direccion == 'H')
  //       {
  //         entra = this.entraPalabra(columna, palabra);
  //         if(entra == false){
  //           columna = Math.floor(Math.random() * 15); 
  //         }
  //       }else{
  //         entra = this.entraPalabra(fila, palabra);
  //         if(entra == false){
  //           fila = Math.floor(Math.random() * 15);
  //         }
  //       }
  //     }
  //     while(entra == false);
  //     // cuando ya se que entra las ubico
  //     for (let i = 0; i < palabra.length; i++){
  //       if (direccion === 'H') {
  //         this.tablero[fila][columna + i] = palabra[i];
  //         if(palabra.length -1 == i){
  //           direccion = 'V';
  //         }
  //       } else if (direccion === 'V') {
  //         this.tablero[fila + i][columna] = palabra[i];
  //         if(palabra.length -1 == i){
  //           direccion = 'H';
  //         }
  //       }
  //     }      
  //   });
  // }
  colocarPalabra(){    
    let palabra = this.tomarPalabraAlAzar();    
    console.log('palabra elegida',palabra);
    let fila = Math.floor(Math.random() * 15);
    let columna = Math.floor(Math.random() * 15);      
    let entra;
    let colocable;    
    
    do {        
      if(this.direccion == 'H')
      {
        entra = this.entraPalabra(columna, palabra);
        if(entra == false ){
          columna = Math.floor(Math.random() * 15); 
        }
      }else{
        entra = this.entraPalabra(fila, palabra);
        if(entra == false){
          fila = Math.floor(Math.random() * 15);
        }
      }
      if(entra && !this.esColocable(palabra, fila, columna)){
        entra = false;
        console.log('no es colocable');
        columna = Math.floor(Math.random() * 15);
        fila = Math.floor(Math.random() * 15);
      }
    }while(entra == false);
    
    


    for (let i = 0; i < palabra.length; i++){
      if (this.direccion === 'H') {
        this.tablero[fila][columna + i] = palabra[i];
        if(palabra.length -1 == i){
          this.direccion = 'V';
        }
      } else if (this.direccion === 'V') {
        this.tablero[fila + i][columna] = palabra[i];
        if(palabra.length -1 == i){
          this.direccion = 'H';
        }
      }
    }      
  }

  tomarPalabraAlAzar(): string {
    const indice = Math.floor(Math.random() * this.palabras.length);
    return this.palabras[indice];
  }
  entraPalabra(posicion: number, palabra:string){
    let lugaresDisp = (this.tam-1)-(posicion);
    if( lugaresDisp - palabra.length >=0){
      return true;
    }
    return false;
  }
  esColocable(palabra:string, fila:number, columna:number){        
    for (let i = 0; i < palabra.length; i++){
      if (this.direccion === 'H') {
        if(this.tablero[fila][columna + i] != '' && this.tablero[fila][columna + i] != palabra[i]){
          return false;
        }
      } else if (this.direccion === 'V') {
        //if(this.tablero[fila][columna + i] != '' && this.tablero[fila][columna + i] != palabra[i]){    
        if (this.tablero[fila + i][columna] !== '' && this.tablero[fila + i][columna] !== palabra[i]) {                 
          return false;
        }        
      }
    }
    return true;          
  }
  // comprobar(): void {
  //   let allCorrect = true;
    
  //   this.palabras.forEach(palabraObj => {
  //     const { palabra, fila, columna, direccion } = palabraObj;
  //     for (let i = 0; i < palabra.length; i++) {
  //       const letraUsuario = (direccion === 'H') ? this.tablero[fila][columna + i] : this.tablero[fila + i][columna];
  //       if (letraUsuario.toLowerCase() !== palabra[i].toLowerCase()) {
  //         allCorrect = false;
  //       }
  //     }
  //   });
  
  //   if (allCorrect) {
  //     alert('¡Felicidades! Has completado el crucigrama correctamente.');
  //   } else {
  //     alert('Algunas respuestas son incorrectas, sigue intentando.');
  //   }
  // }
  comenzar(): void {
    this.jugando = true;     
    this.inicializarTablero();
    for(let i = 0; i<10; i++){
      this.colocarPalabra();
    }
    //this.colocarPalabra()
    // this.colocarPalabras();
  }
}
