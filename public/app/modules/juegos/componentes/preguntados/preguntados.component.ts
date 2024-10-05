import { Component, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../../services/preguntados.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit{
  jugando = false;
  cargandoJuego = true;
  preguntas: any[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedAnswer: string = '';
  tiempo = 15;
  temporizador :any|null = null;
  

  constructor(private preguntadosService: PreguntadosService) { }

  ngOnInit(): void {
    this.pedirPregunta();
  }

  //hacer que el boton de pregunte se active cuando ya sepas que la pregunta este cargada
  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.checkAnswer();
  }

  checkAnswer() {
    const currentQuestion = this.preguntas[this.currentQuestionIndex];
    if (this.selectedAnswer === currentQuestion.correct_answer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    this.selectedAnswer = '';
  }

  restartGame() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.ngOnInit();
  }
  comenzar(): void {
  this.jugando = true;     
  }
  pedirPregunta(){
    this.cargandoJuego = true;
    this.preguntadosService.getPreguntas().subscribe(data => {      
      this.preguntas = data.results;
      //tomo preguntas, las mezclo
      this.preguntas.forEach(pregunta => {
        pregunta.allAnswers = [...pregunta.incorrect_answers, pregunta.correct_answer];
        pregunta.allAnswers.sort(() => Math.random() - 0.5);
      });
      this.cargandoJuego = false; //ya cargó, saco el spinner   
      if(this.currentQuestionIndex == 0){
        this.iniciarTemporizador();  
      }      
    });
  }
  iniciarTemporizador(): void {          
    if(this.currentQuestionIndex != 10){
      this.temporizador= setInterval(() => {
        if (this.tiempo > 0 && this.currentQuestionIndex < 10) {
          this.tiempo--;
          console.log(this.tiempo);
          
        } else {
          this.pasarAsiguientePregunta(); // Si se acaba el tiempo, ejecuta esta función
          this.stopTemporizador();
          this.tiempo = 15;
        }
      }, 1000);    
    }else{
      this.stopTemporizador();
    }
  }
  pasarAsiguientePregunta(){
    this.currentQuestionIndex++;
    this.selectedAnswer = '';
    this.iniciarTemporizador();
  }
  stopTemporizador() {
    this.reiniciarTemporizador(); // Llamamos a clearTimer para detener el temporizador
  }

  reiniciarTemporizador() {
    if (this.temporizador) {
      clearInterval(this.temporizador); // Detenemos el temporizador
      this.temporizador = null; // Limpiamos la referencia del temporizador     
      this.tiempo = 15; 
    }
  }
}
