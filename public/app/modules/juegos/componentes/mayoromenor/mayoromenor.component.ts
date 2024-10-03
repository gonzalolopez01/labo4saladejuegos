import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartasService} from '../../../../services/cartas.service';
import { Carta } from '../../../../clases/carta';

@Component({
  selector: 'app-mayoromenor',
  standalone: false,
  templateUrl: './mayoromenor.component.html',
  styleUrl: './mayoromenor.component.css'
})
export class MayoromenorComponent implements OnInit{

  jugando = false;
  idMazo!: string;
  suscription!: Subscription;  
  cargando = false;
  cargo = false;
  error: string | null = null;

  cartaPedida:Carta | null = null;
  cartaActual:Carta | null = null;
  cartaAnterior:Carta | null = null;

  valor!:boolean;
  primeraVuelta = true;
  estado: string | null = null;

  perdiste = false;

  puntaje = 0;

  cargandoCarta = false;

  cargandoJuego = true;

  $botonMayor:  HTMLButtonElement | null = null;
  $botonMenor:  HTMLButtonElement | null = null;
  
  constructor(private cartasService: CartasService){
    setTimeout(() => {
      this.cargandoJuego = false; // Cuando termine la tarea, ocultar el spinner
    }, 2000); 
    
  }

  ngOnInit(): void {  
    this.obtenerMazo();       
    
  }
  obtenerMazo(){
    this.cargando = true; //controlo spinner
    this.suscription = this.cartasService.getMazo().subscribe(
      (cartas:any) =>{
        this.idMazo = cartas.deck_id;  
        this.cargando = false;
        this.cargo = true;//ya cargo puedo pedir cartas
        console.log('deck id: ', this.idMazo);
        if(this.jugando){
          this.pedirCarta();
        }        
      },
      error => {
        console.error('Error al cargar las cartas', error);
        this.error = 'No se pudo cargar el mazo. Intenta de nuevo más tarde.';
        this.cargando = false; // oculto spinner
      });
  }
  pedirCarta(){        
    this.cargandoCarta = true;
    //this.desactivarBotones();
    this.cartasService.getCarta(this.idMazo).subscribe(
      (response: any) => {
        // Verificar si la respuesta tiene cartas
        if (response && response.cards && response.cards.length > 0) {
          const carta = response.cards[0];           
          let valor = this.formatearValor(carta.value);                         
          const cartaProcesada = {
            //image: carta.images.png, // Usamos la imagen 'png'
            image: carta.image,            
            value: valor,
            suit: carta.suit
          };            
          this.cartaPedida = cartaProcesada;  
          
          if(this.primeraVuelta){          //primera vuelta  
            this.primeraVuelta = false;
            this.cargandoCarta = false;           
          }else{
            this.cargandoCarta = false;
            this.comparar();//comparo carta actual con carta pedida            
          }
          this.acomodadorCartas(this.cartaPedida);  
        }
      },
      error => {
        this.cargandoCarta= false;
        console.error('Error al obtener la carta:', error);
      }
    );
  }

  comenzar(): void {
    this.jugando = true;     
    this.pedirCarta();
  }
  
  comparar(){    
    if(this.cartaPedida!.value != this.cartaActual!.value){
      let cartaPedida = Number(this.cartaPedida!.value);
      let cartaActual = Number(this.cartaActual!.value);
      if(this.valor == true){//mayor
        //if(this.cartaPedida!.value > this.cartaActual!.value){
        if(cartaPedida > cartaActual){  
          console.log('anterior: ',cartaActual, ' actual: ',cartaPedida);
          console.log('eligio mayor ---> bien');   
          this.mostrarMensaje('correcto');
          this.puntaje++;
        }else{
          console.log('anterior: ',cartaActual, ' actual: ',cartaPedida);
          console.log('eligio mayor ---> mal');   
          this.mostrarMensaje('incorrecto');
          this.perdiste = true;
          this.cargo = false;
        }   
      }else{//menor
        //if(this.cartaPedida!.value < this.cartaActual!.value){
        if(cartaPedida < cartaActual){
          console.log('anterior: ',cartaActual, 'actual',cartaPedida);
          console.log('eligio menor ---> bien');
          this.mostrarMensaje('correcto');
          this.puntaje++;
        }else{
          console.log('anterior: ',cartaActual, ' actual: ',cartaPedida);
          console.log('eligio menor ---> mal');
          this.mostrarMensaje('incorrecto');
          this.perdiste = true;
          this.cargo = false;
        }
      }
    }
    else{
      console.log('No cuenta, son iguales');
    }
  }
  acomodadorCartas(carta:Carta){
    if ((this.cartaAnterior && this.cartaActual) || !this.cartaAnterior){
      this.cartaAnterior = this.cartaActual;
      this.cartaActual = carta;
    }else {
      this.cartaActual = carta;
    }    
  }
  formatearValor(valor:string){
    switch(valor){
      case 'JACK': 
       return '11';
      case 'QUEEN':
        return '12';
      case 'KING':
        return '13';
      case 'ACE':
       return '14';
       default:
        return valor;
    }    
  }
  mostrarMensaje(estado: string) {
    this.estado = estado;  
    if(this.perdiste){
      setTimeout(() => {
        this.estado = null;  
      }, 10000);
    }else{
      setTimeout(() => {
        this.estado = null;  
      }, 1500);
    }
  }
  restart(){
    this.primeraVuelta = true;
    this.perdiste = false;
    this.cartaPedida = null;
    this.cartaActual = null;
    this.cartaAnterior = null;
    this.puntaje = 0;
    this.obtenerMazo();    
  }
  // desactivarBotones(){
  //   this.$botonMayor!.disabled = true;
  //   this.$botonMenor!.disabled = true;
  // }  
  // activarBotones(){
  //   this.$botonMayor!.disabled = false;
  //   this.$botonMenor!.disabled = false;
  // }  
  // pulsarBotonDesactivar(){
  //   this.$botonMayor = document.getElementById('botonMayor') as HTMLButtonElement;
  //   this.$botonMenor = document.getElementById('botonMenor') as HTMLButtonElement;
  //   console.log('boton: ',this.$botonMayor);    
  //   if(this.$botonMayor != null){

  //   }
  // }
}
