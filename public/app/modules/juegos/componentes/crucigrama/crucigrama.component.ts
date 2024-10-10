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
  tam: number = 12;
  jugando = false;
  direccion = 'H';

  palabras = [
    
    'ALBANIA','ALEMANIA','ANDORRA','AUSTRIA','BELARUS','BELGICA','BULGARIA','CHIPRE',
    'CROACIA', 'DINAMARCA', 'ESLOVAQUIA', 'ESLOVENIA','ESPAÑA','ESTONIA','FINLANDIA',
    'FRANCIA','GRECIA','HUNGRIA','IRLANDA','ISLANDIA','ITALIA','LETONIA','LIECHTENSTEIN',
    'LITUANIA','LUXEMBURGO','MACEDONIA','MALTA','MOLDOVA','MONACO','MONTENEGRO',
    'NORUEGA', 'PAISES BAJOS','POLONIA','PORTUGAL','INGLATERRA','GALES','ESCOCIA','RUMANIA',
    'RUSIA','SERBIA', 'SUECIA','SUIZA','TURQUIA','UCRANIA','VATICANO',
    'ARGENTINA','ARUBA','BAHAMAS','BARBADOS','BELICE','BOLIVIA','BRASIL','CANADA','CHILE',                                                   
    'COLOMBIA','CUBA','DOMINICANA','ECUADOR','GRANADA','GUATEMALA','GUYANA','HAITI','HONDURAS',                                                
    'JAMAICA','MEXICO','NICARAGUA','PANAMA','PARAGUAY','PERU','URUGUAY', 'ANGOLA', 'ARGELIA', 
    'BENIN', 'BOTSUANA','BURUNDI','CAMERUN', 'CHAD', 'COMORAS','EGIPTO','ERITREA', 'ESUATINI',
    'ETIOPIA', 'GABON', 'GAMBIA', 'GHANA','GUINEA','KENIA', 'LESOTHO', 'LIBERIA', 'LIBIA',
    'MADAGASCAR', 'MALAUI', 'MALI', 'MARRUECOS', 'MAURICIO', 'MAURITANIA', 'MOZAMBIQUE',
    'NAMIBIA', 'NIGER', 'NIGERIA', 'RUANDA','SENEGAL', 'SEYCHELLES', 'SOMALIA', 'SUDAFRICA', 'SUDAN', 
    "TANZANIA", "TOGO", "TUNEZ", "UGANDA", "YIBUTI", "ZAMBIA",'ZIMBABUE'
   ];
   // {palabra: 'angular', fila: 1, columna: 1, direccion: 'H', pista: 'Framework para crear aplicaciones web.'},
    // {palabra: 'typescript', fila: 3, columna: 1, direccion: 'V', pista: 'Lenguaje de programación que mejora JavaScript.'},
    // {palabra: 'crucigrama', fila: 5, columna: 5, direccion: 'H', pista: 'Juego de palabras que se cruzan.'},

  constructor() { }

  ngOnInit(): void {
    // this.inicializarTablero();
    // this.colocarPalabras();
  }

  inicializarTablero(): void {
    // crear un tablero vacio con espacios en blanco
    this.tablero = Array(this.tam).fill(null).map(() => Array(this.tam).fill(''));    
  }
  tomarPalabraAlAzar(): string | null {
    if (this.palabras.length === 0) {
        return null; 
    }
    
    const indice = Math.floor(Math.random() * this.palabras.length);
    const palabra = this.palabras[indice];
      
    this.palabras.splice(indice, 1);
    
    return palabra;
  }
  colocarPrimeraPalabra(): void {
    // Tomar una palabra al azar
    const palabra = this.tomarPalabraAlAzar();
    
    // Si no hay palabra disponible, termina la función
    if (!palabra) return;

    let fila, columna, entra;

    // Generar posición aleatoria entre filas 0 a 4 y columnas 0 a 3
    do {
        fila = Math.floor(Math.random() * 3); // Filas entre 0 y 2
        columna = Math.floor(Math.random() * 4); // Columnas entre 0 y 3

        // Comprobar si la palabra entra en el tablero desde esta posición
        entra = this.entraPalabraHorizontalmente(palabra, fila, columna);
    } while (!entra); // Seguir intentando hasta que la palabra pueda colocarse

    // Colocar la palabra en el tablero
    for (let i = 0; i < palabra.length; i++) {
        this.tablero[fila][columna + i] = palabra[i];
    }
  }
  entraPalabraHorizontalmente(palabra: string, fila: number, columna: number): boolean {
    // Verificar si la palabra puede colocarse desde la posición (fila, columna)
    if (columna + palabra.length > this.tam) {
        return false; // Si la palabra no cabe, retorna false
    }

    // Comprobar que las celdas en el tablero estén vacías
    for (let i = 0; i < palabra.length; i++) {
        if (this.tablero[fila][columna + i] !== '') {
            return false; // Si alguna celda no está vacía, retorna false
        }
    }

    return true; // Si pasa todas las comprobaciones, retorna true
  }
  tomarLetraAlAzar(palabra: string): string {
    const indice = Math.floor(Math.random() * palabra.length);
    return palabra[indice];
}

  comenzar(): void {
    this.jugando = true;     
    this.inicializarTablero();
    this.colocarPrimeraPalabra();
    //this.colocarPalabra()
    // this.colocarPalabras();
  }



  

  // tomarPalabraAlAzar(): string {
  //   const indice = Math.floor(Math.random() * this.palabras.length);
  //   return this.palabras[indice];
  // }
 
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
  esColocableConEspacio(palabra: string, fila: number, columna: number): boolean {
    for (let i = 0; i < palabra.length; i++) {
      if (this.direccion === 'H') {
        //primera letra (izquierda no puede tener letras, arriba/abajo solo en interseccion)
        if (i === 0) {          
          if (columna > 0 && this.tablero[fila][columna - 1] !== '') return false; //izq          
          // no pegado al techo / si hay letra arriba / y no hay conincidencia
          if (fila > 0 && this.tablero[fila - 1][columna] !== '' && this.tablero[fila][columna] !== palabra[i]) return false;
          //fila 14 / 
          if (fila < this.tam - 1 && this.tablero[fila + 1][columna] !== '' && this.tablero[fila][columna] !== palabra[i]) return false;
          
          // Verifica que la celda donde se coloca la primera letra esté vacía
          //if (this.tablero[fila][columna] !== '' && this.tablero[fila][columna] !== palabra[i]) return false;
        }
  
        //letras intermedias (arriba/abajo solo si es interseccion)
        if (i > 0 && i < palabra.length - 1) {
          //compara posicion del tablero donde va a ir la letra con la letra
          if (this.tablero[fila][columna + i] === palabra[i]) {
            continue;
          } else {                      
            if (fila > 0 && this.tablero[fila - 1][columna + i] !== '') return false;
            if (fila < this.tam - 1 && this.tablero[fila + 1][columna + i] !== '') return false;
          }
        }        
        //ultima letra (derecha no puede tener letras, arriba/abajo solo en interseccion)
        if (i === palabra.length - 1) {
          if (columna + i < this.tam - 1 && this.tablero[fila][columna + i + 1] !== '') return false;
          if (fila > 0 && this.tablero[fila - 1][columna + i] !== '' && this.tablero[fila][columna + i] !== palabra[i]) return false;
          if (fila < this.tam - 1 && this.tablero[fila + 1][columna + i] !== '' && this.tablero[fila][columna + i] !== palabra[i]) return false;
        }
  
      } else if (this.direccion === 'V') {
        //colocacion en vertical, logica similar a la de horizontal, pero chequeando arriba/abajo y a los lados
        if (i === 0) {
          //letras arriba
          if (fila > 0 && this.tablero[fila - 1][columna] !== '') return false;
          //izq(solo interseccion sera posible)
          if (columna > 0 && this.tablero[fila][columna - 1] !== '' && this.tablero[fila][columna] !== palabra[i]) return false;
          //derecha(solo inter)
          if (columna < this.tam - 1 && this.tablero[fila][columna + 1] !== '' && this.tablero[fila][columna] !== palabra[i]) return false;

          // Verifica que la celda donde se coloca la primera letra esté vacía
          //if (this.tablero[fila][columna] !== '' && this.tablero[fila][columna] !== palabra[i]) return false;          
        }
  
        if (i > 0 && i < palabra.length - 1) {
          if (this.tablero[fila + i][columna] === palabra[i]) {
            continue;
          } else {
            if (columna > 0 && this.tablero[fila + i][columna - 1] !== '') return false;
            if (columna < this.tam - 1 && this.tablero[fila + i][columna + 1] !== '') return false;
          }
        }
  
        if (i === palabra.length - 1) {
          if (fila + i < this.tam - 1 && this.tablero[fila + i + 1][columna] !== '') return false;
          if (columna > 0 && this.tablero[fila + i][columna - 1] !== '' && this.tablero[fila + i][columna] !== palabra[i]) return false;
          if (columna < this.tam - 1 && this.tablero[fila + i][columna + 1] !== '' && this.tablero[fila + i][columna] !== palabra[i]) return false;
        }
      }
    }
    //evito superposicion sin coincidencias (maximo 3)
    for (let i = 0; i < palabra.length; i++) {
      let coincidencias = 0;
      if (this.direccion === 'H') {
          if (this.tablero[fila][columna + i] !== '' && this.tablero[fila][columna + i] !== palabra[i] && coincidencias < 4) {
              return false; // Superposición completa
          }else{
            coincidencias++;
          }
      } else if (this.direccion === 'V') {
          if (this.tablero[fila + i][columna] !== '' && this.tablero[fila + i][columna] !== palabra[i] && coincidencias < 4) {
              return false; // Superposición completa
          }else{
            coincidencias++;
          }
      }
    }
    return true;
  }
  
  // colocarPalabra(){    
  //   let palabra = this.tomarPalabraAlAzar();        
  //   let fila, columna, entra, colocable;
  //   let contador = 0;
  //   do {
  //       contador++;
  //       fila = Math.floor(Math.random() * this.tam);
  //       columna = Math.floor(Math.random() * this.tam);
  //       console.log('palabra: ', palabra, ' fila: ',fila, 'columna: ', columna);

  //       if (this.direccion === 'H') {
  //           entra = this.entraPalabra(columna, palabra);  // Verifica si la palabra entra horizontalmente
  //           console.log('entra: ',entra);
  //       } else {
  //           entra = this.entraPalabra(fila, palabra);  // Verifica si la palabra entra verticalmente
  //       }
  //       if (entra) {

  //           // Verifica que sea colocable por intersección y por espacio alrededor
  //           //colocable = this.esColocable(palabra, fila, columna) && this.esColocableConEspacio(palabra, fila, columna);
  //           colocable = this.esColocableConEspacio(palabra, fila, columna);
  //           if (!colocable) {
  //               entra = false;  // Si no es colocable correctamente, forzar el cambio de fila/columna
  //           }            
          
  //       }

  //       if (contador == 10000){
  //         palabra = this.tomarPalabraAlAzar();          
  //         contador = 0;
  //       }
  //       console.log(palabra);
  //   } while (!entra);  // Repetir el ciclo hasta que encuentre un lugar válido        
  //   contador = 0;
  //   // Si sale del ciclo, se puede colocar la palabra
  //   for (let i = 0; i < palabra.length; i++) {
  //     if (this.direccion === 'H') {
  //         this.tablero[fila][columna + i] = palabra[i];
  //         if (i === palabra.length - 1) {
  //             this.direccion = 'V';  // Alterna la dirección después de colocar la palabra
  //         }
  //     } else {
  //         this.tablero[fila + i][columna] = palabra[i];
  //         if (i === palabra.length - 1) {
  //             this.direccion = 'H';  // Alterna la dirección después de colocar la palabra
  //         }
  //     }
  //   }      
  //   console.log('palabra: ' + palabra, ' columna: ' + columna, 'fila: ' + fila);
    
  // }

  // esColocable2(palabra:string, fila:number, columna:number){
  //   for (let i = 0; i < palabra.length; i++){
  //     if (this.direccion === 'H') {
  //       if(this.tablero[fila][columna + i] != '' && this.tablero[fila][columna + i] != palabra[i]){
  //         return false;
  //       }
  //     } else if (this.direccion === 'V') {
  //       //primera letra
  //       if (fila + i === fila && ()) {                 
          
  //       }
        
  //       if (this.tablero[fila + i][columna] !== '' && this.tablero[fila + i][columna] !== palabra[i]) {                 
  //         return false;
  //       }        
  //     }
  //   }
  //   return true;  
  // }


  // primeraLetra(palabra: string, fila: number, columna: number): boolean {
  //   for (let i = 0; i < palabra.length; i++) {

  //   }  
  // }

  // esColocableConEspacio(palabra: string, fila: number, columna: number): boolean {
  //   for (let i = 0; i < palabra.length; i++) {
  //     // Verificar la dirección
  //     if (this.direccion === 'H') {
  //       // Colocación en horizontal
        
  //       // 1. Verificar la primera letra
  //       if (i === 0) {
  //         // No debe haber letra a la izquierda, salvo que sea un borde
  //         if (columna > 0 && this.tablero[fila][columna - 1] !== '') {
  //           return false;
  //         }
  //         // Puede haber letras arriba o abajo solo si es una intersección
  //         if (fila > 0 && this.tablero[fila - 1][columna] !== '' && this.tablero[fila][columna] !== palabra[i]) {
  //           return false;
  //         }
  //         if (fila < this.tam - 1 && this.tablero[fila + 1][columna] !== '' && this.tablero[fila][columna] !== palabra[i]) {
  //           return false;
  //         }
  //       }
  
  //       // 2. Verificar las letras intermedias
  //       if (i > 0 && i < palabra.length - 1) {
  //         if (this.tablero[fila][columna + i] === palabra[i]) {
  //           // Si es una intersección, puede tener letras arriba o abajo
  //           continue;
  //         } else {
  //           // No debe haber letras arriba ni abajo si no hay intersección
  //           if (fila > 0 && this.tablero[fila - 1][columna + i] !== '') {
  //             return false;
  //           }
  //           if (fila < this.tam - 1 && this.tablero[fila + 1][columna + i] !== '') {
  //             return false;
  //           }
  //         }
  //       }
  
  //       // 3. Verificar la última letra
  //       if (i === palabra.length - 1) {
  //         // No debe haber letra a la derecha
  //         if (columna + i < this.tam - 1 && this.tablero[fila][columna + i + 1] !== '') {
  //           return false;
  //         }
  //         // Puede tener letras arriba o abajo solo si es intersección
  //         if (fila > 0 && this.tablero[fila - 1][columna + i] !== '' && this.tablero[fila][columna + i] !== palabra[i]) {
  //           return false;
  //         }
  //         if (fila < this.tam - 1 && this.tablero[fila + 1][columna + i] !== '' && this.tablero[fila][columna + i] !== palabra[i]) {
  //           return false;
  //         }
  //       }
  
  //     } else if (this.direccion === 'V') {
  //       // Colocación en vertical
        
  //       // 1. Verificar la primera letra
  //       if (i === 0) {
  //         // No debe haber letra arriba, salvo que sea un borde
  //         if (fila > 0 && this.tablero[fila - 1][columna] !== '') {
  //           return false;
  //         }
  //         // Puede haber letras a la izquierda o derecha solo si es una intersección
  //         if (columna > 0 && this.tablero[fila][columna - 1] !== '' && this.tablero[fila][columna] !== palabra[i]) {
  //           return false;
  //         }
  //         if (columna < this.tam - 1 && this.tablero[fila][columna + 1] !== '' && this.tablero[fila][columna] !== palabra[i]) {
  //           return false;
  //         }
  //       }
  
  //       // 2. Verificar las letras intermedias
  //       if (i > 0 && i < palabra.length - 1) {
  //         if (this.tablero[fila + i][columna] === palabra[i]) {
  //           // Si es una intersección, puede tener letras a los lados
  //           continue;
  //         } else {
  //           // No debe haber letras a la izquierda ni a la derecha si no hay intersección
  //           if (columna > 0 && this.tablero[fila + i][columna - 1] !== '') {
  //             return false;
  //           }
  //           if (columna < this.tam - 1 && this.tablero[fila + i][columna + 1] !== '') {
  //             return false;
  //           }
  //         }
  //       }
  
  //       // 3. Verificar la última letra
  //       if (i === palabra.length - 1) {
  //         // No debe haber letra abajo
  //         if (fila + i < this.tam - 1 && this.tablero[fila + i + 1][columna] !== '') {
  //           return false;
  //         }
  //         // Puede tener letras a los lados solo si es intersección
  //         if (columna > 0 && this.tablero[fila + i][columna - 1] !== '' && this.tablero[fila + i][columna] !== palabra[i]) {
  //           return false;
  //         }
  //         if (columna < this.tam - 1 && this.tablero[fila + i][columna + 1] !== '' && this.tablero[fila + i][columna] !== palabra[i]) {
  //           return false;
  //         }
  //       }
  //     }
  //   }
  //   return true;  // Si pasa todas las verificaciones, es colocable
  // }
  




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
  
 
}
