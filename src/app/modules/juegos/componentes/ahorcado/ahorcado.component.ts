import { Component, OnInit } from '@angular/core';
import { count } from '@firebase/firestore';
import { PuntajesService } from '../../../../services/puntajes.service';

@Component({
  selector: 'app-ahorcado',  
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent  implements OnInit{
  palabra: string = '';

  char: string = '';
  palabraIncompleta: string [] = [];
  palabras: string[] = ['PERRO', 'GATO', 'PAJARO', 'ELEFANTE', 'TIGRE', 'CANGURO', 'JIRAFA', 'COCODRILO', 'RINOCERONTE', 'HIPOPOTAMO', 'LEON', 'SERPIENTE', 'CONEJO'];
  teclado: string[] = [];  
  imagenes: string[] = [
    'assets/img/ahorcado/0.jpg',
    'assets/img/ahorcado/1.jpg',
    'assets/img/ahorcado/2.jpg',
    'assets/img/ahorcado/3.jpg',
    'assets/img/ahorcado/4.jpg',
    'assets/img/ahorcado/5.jpg',
    'assets/img/ahorcado/6.jpg'
  ];
  index = 0;  
  mensaje = '';
  ganaste = false;
  cargando = true;
  puntaje = 0;
  // $boton = document.getElementById('botonJugar');

  constructor(private puntajeService:PuntajesService) {
    this.teclado= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');   
    
    setTimeout(() => {
      this.cargando = false; // Cuando termine la tarea, ocultar el spinner
    }, 2000); 
  }
  ngOnInit(): void {
    //this.generarTeclado();
  }
  jugar(){
    this.puntaje = 0;
    this.ganaste = false;
    this.index = 0;
    this.generarTeclado();
    const divTeclado = document.getElementById('teclado');
    divTeclado!.classList.toggle('inactivo');
    const $boton = document.getElementById('botonJugar');
    $boton!.hidden = true;
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)]; //palabra al azar
    console.log(this.palabra);
    this.palabraIncompleta = this.palabra.split('').map(() => '_');    
    //this.generarPalabraIncompleta();
    //this.generarTeclado();

  }  
  generarTeclado(){    
    const $divTeclado1 = document.getElementById('teclado1');
    const $divTeclado2 = document.getElementById('teclado2');
    // this.teclado.forEach(tecla => {      
    for(let i = 0; i< this.teclado.length; i++){
      const button = document.createElement('button');    
      button.classList.add('btn'); 
      const span = document.createElement('span');
      //button.textContent = tecla;     
      
      button.style.backgroundColor = 'green';  
      button.style.color = 'white';            
      button.style.fontSize = '20px';          
      button.style.padding = '10px 20px';

      button.textContent = this.teclado[i];   
      span.classList.add('container','mr-3');
      span.appendChild(button);

      button.addEventListener('click', () => {
        this.char = button.textContent || '';    
        button.disabled = true;     
        this.buscarCoincidencia(this.char);
      });

      if(i < 14){
        $divTeclado1!.appendChild(span);
      }else{
        $divTeclado2!.appendChild(span);
      }
    // });    
   }
  }
  iniciar(){
    
  }
   
  buscarCoincidencia(letra:string){
    if(this.palabra.includes(letra)){
      for(let i=0; i<this.palabra.length; i++){
        if(this.palabra[i]===letra){
          this.palabraIncompleta[i] = letra;
          this.puntaje++;
        }
      }      
      if(this.esGanador()){
        this.mensaje = "Ganaste!!!";
        this.deshabilitarTeclado();
        this.ganaste=true;
        setTimeout(() => {
          this.guardarPuntaje();
        }, 3000);
        return;
      }
    }
    else{
      this.index++;
      if(this.index === 6){   
        this.mensaje = "Perdiste!!!";  
        this.deshabilitarTeclado();    
        setTimeout(() => {
          this.guardarPuntaje();
        }, 3000);
        return;
      }
    }
  }
  esGanador():boolean{
    for(let i=0; i<this.palabra.length; i++){
      if(this.palabra[i]!==this.palabraIncompleta[i]){        
        return false;
      }
    }    
    return true;
  }
  deshabilitarTeclado(){
    const divTeclado1 = document.getElementById('teclado1');
    const divTeclado2 = document.getElementById('teclado2');
    divTeclado1!.innerHTML = '';
    divTeclado2!.innerHTML = '';
  }
  // cargarEspacios(numero:number){
  //   const contenedorEspacios = document.getElementById('palabra');

  //   for (let i = 0; i < numero; i++) {
  //     const $div = document.createElement('div');
  //     $div.classList.add('espacio');

  //     $div.innerHTML = `
  //     <p>-</p>`;
  //     contenedorEspacios?.appendChild($div);
  //   }
  // }

  // generarPalabraIncompleta(){
  //   const $divPalabra = document.getElementById('palabra');    
  //   this.palabraIncompleta.forEach(casillero => {      
  //   //for(let i = 0; i< this.teclado.length; i++){
  //     const span = document.createElement('span');                
  //     span.textContent = casillero;   
  //     $divPalabra?.appendChild(span);
  //   });
  // }

  
  // guardarPuntaje(){
  //   this.puntajeService.guardarResultado('Ahoracado', this.puntaje)
  //     .then(()=> console.log('Resulatado guardado'))
  //     .catch(error => console.error('Error al guardar puntaje: ', error));    
  // }
  async guardarPuntaje() {
    try {
      await this.puntajeService.guardarResultado('Ahoracado', this.puntaje);
      console.log('Resultado guardado');      
    } catch (error) {
      console.error('Error al guardar puntaje: ', error);
    }
  }
  
}

