import { Component, OnDestroy, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../../services/preguntados.service';
import { QuizService } from '../../../../services/quiz.service';
import { UrlTree } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit, OnDestroy{
  jugando = false;
  cargandoJuego = true;
  preguntas: any[] = [];
  currentQuestionIndex: number = 0;
  score: number = 0;
  selectedAnswer: string = '';
  tiempo = 15;
  temporizador :any|null = null;
  spinnerOn = true;
  urlFondo = '';
  

  constructor(private preguntadosService: PreguntadosService, private quizService: QuizService) { }
  ngOnDestroy(): void {
    clearInterval(this.temporizador); // stop tempo
    this.temporizador = null; // saco ref tempo     
  }

  ngOnInit(): void {    
    this.pedirPregunta();
    this.jugando = false;
  }

  //hacer que el boton de pregunte se active cuando ya sepas que la pregunta este cargada
  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.checkAnswer();
  }

  checkAnswer() {
    const currentQuestion = this.preguntas[this.currentQuestionIndex];
    //if (this.selectedAnswer === currentQuestion.correct_answer) {
    if (this.selectedAnswer === currentQuestion.correctAnswers) {
      this.score++;
    }
    this.currentQuestionIndex++;
    this.selectedAnswer = '';
  }

  restartGame() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.spinnerOn = true;
    this.ngOnInit();
  }
  comenzar(): void {
    this.jugando = true;    
    setTimeout(() => {
      console.log("Demora de 2 segundos completada");
      this.spinnerOn = false;    
      this.iniciarTemporizador();
      // Aquí puedes colocar el código que deseas ejecutar después de la demora.
    }, 2000);    
    this.setBackground(this.preguntas[0].category);
    // console.log('aca: ',this.preguntas[0].category);
  }
  pedirPregunta(){
    
    this.cargandoJuego = true;                    
    this.quizService.getQuestions().subscribe(data => {     
      this.preguntas = data.questions;            
      //tomo preguntas, las mezclo      
      this.preguntas.forEach(pregunta => {
        pregunta.allAnswers = [...pregunta.incorrectAnswers, pregunta.correctAnswers];
        pregunta.allAnswers.sort(() => Math.random() - 0.5);
      });      
      this.cargandoJuego = false; //ya cargó, saco el spinner                    
      
      // if(this.currentQuestionIndex == 0){
      //   this.iniciarTemporizador();  
      // }      
    });
  }
  // pedirPregunta() {
  //   this.cargandoJuego = true;
  
  //   this.preguntadosService.getPreguntas().subscribe(data => {
  //     this.preguntas = data.results;
  
  //     // Traducir preguntas y respuestas
  //     const traducciones: Promise<any>[] = [];
  
  //     this.preguntas.forEach(pregunta => {
  //       // Traducir la pregunta
  //       traducciones.push(this.traductorService.translateText(pregunta.question, 'es').then(translatedQuestion => {
  //         pregunta.question = translatedQuestion.translatedText;
  //       }));
  
  //       // Traducir las respuestas incorrectas
  //       pregunta.incorrect_answers.forEach((answer:string, index:number) => {
  //         traducciones.push(this.traductorService.translateText(answer, 'es').then(translatedAnswer => {
  //           pregunta.incorrect_answers[index] = translatedAnswer.translatedText;
  //         }));
  //       });
  
  //       // Traducir la respuesta correcta
  //       traducciones.push(this.traductorService.translateText(pregunta.correct_answer, 'es').then(translatedAnswer => {
  //         pregunta.correct_answer = translatedAnswer.translatedText;
  //       }));
  //     });
  
  //     // Esperar todas las traducciones
  //     Promise.all(traducciones).then(() => {
  //       // Una vez traducidas, mezclo las respuestas
  //       this.preguntas.forEach(pregunta => {
  //         pregunta.allAnswers = [...pregunta.incorrect_answers, pregunta.correct_answer];
  //         pregunta.allAnswers.sort(() => Math.random() - 0.5);
  //       });
  
  //       this.cargandoJuego = false; // Ya cargó, saco el spinner   
  //       if (this.currentQuestionIndex == 0) {
  //         this.iniciarTemporizador();  
  //       }
  //     }).catch(error => {
  //       console.error('Error al traducir:', error);
  //       this.cargandoJuego = false;  // Si hay error, detener el spinner de todas formas
  //     });
  //   });
  // }

  iniciarTemporizador(): void {          
    if(this.currentQuestionIndex != 10){
      this.temporizador= setInterval(() => {
        if (this.tiempo > 0 && this.currentQuestionIndex < 10) {
          this.tiempo--;
          console.log(this.tiempo);
          
        } else {
          this.pasarAsiguientePregunta(); //si se acaba el tiempo, ejecuta esta funcion
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
    this.reiniciarTemporizador(); //llamo a clearTimer para detener el tempo
  }

  reiniciarTemporizador() {
    if (this.temporizador) {
      clearInterval(this.temporizador); // stop tempo
      this.temporizador = null; // saco ref tempo     
      this.tiempo = 15; 
    }
  }

  setBackground(category: string): void {
    const container = document.getElementById('fondoPreguntas') as HTMLElement;
    console.log("entre")      ;
    //let backgroundUrl: string = '';
    console.log(category);
    switch (category) {
      case 'geography':        
        this.urlFondo = 'assets/img/preguntados/geografia.jpg';  // Agrega la URL que quieras  
        console.log("entre")      ;
        break;
      case 'arts&literature':
        this.urlFondo = 'assets/img/preguntados/literatura.jpg'; // URL para artes y literatura        
        console.log("entre")      ;
        break;
      case 'entertainment':
        this.urlFondo = 'assets/img/preguntados/entretenimiento.jpg'; // URL para entretenimiento        
        console.log("entre")      ;
        break;
      case 'science&nature':
        this.urlFondo = 'assets/img/preguntados/ciencia.jpg';        
        console.log("entre")      ;
        break;
      case 'sports&leisure':
        this.urlFondo = 'assets/img/preguntados/deportes.jpg'; // URL para deportes y ocio        
        console.log("entre")      ;
        break;
      case 'history':
        this.urlFondo = 'assets/img/preguntados/deportes.jpg'; // URL para historia
        console.log("entre")      ;
        break;
      default:
        this.urlFondo = ''; // URL por defecto si no hay categoría válida
    }    
    // console.log(container);
    // if (container) {
    //   container.style.backgroundImage = `url(${backgroundUrl})`;
    //   container.style.backgroundSize = 'cover';
    //   container.style.backgroundPosition = 'center';
    //   container.style.opacity = '0.7'; // Atenuar la imagen      
    // }
  }
}
