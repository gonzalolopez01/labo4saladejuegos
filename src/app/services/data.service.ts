import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // constructor() { }
  
  // private miDataSubject = new Subject<string>();

  //  // Observable que los componentes pueden observar
  //  miData$: Observable<string> = this.miDataSubject.asObservable();
 
  //  // Método para emitir un nuevo valor
  //  setMiData(nuevoValor: string) {
  //    this.miDataSubject.next(nuevoValor); // Emite el nuevo valor     
  //  }

  //EJEMPLO CON BEHAVIOR // con behaivio te pasa el dato del servicio cuando te sucribis, con subject solo cuando haces next
  //Usamos un BehaviorSubject para que los componentes puedan suscribirse a los cambios
  private miDataSubject = new BehaviorSubject<string>(''); // Valor inicial vacío

  // Observable para que los componentes puedan suscribirse
  miData$ = this.miDataSubject.asObservable();

  // Método para cambiar el valor de miData
  setMiData(nuevoValor: string) {
    this.miDataSubject.next(nuevoValor); // Emite un nuevo valor
  }

}
