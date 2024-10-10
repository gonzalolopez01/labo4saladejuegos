import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class PuntajesService {

  constructor(private firestore:Firestore, private auth: Auth) { }

  async guardarResultado(juego: string, puntaje: number): Promise<void> {
    const usuario = this.auth.currentUser?.email; 
    const fecha = new Date();
  
    const resultado = {
      usuario: usuario,
      juego: juego,
      puntaje: puntaje,
      fecha: fecha,
    };
  
    try {
      const col = collection(this.firestore, 'resultados');
      await addDoc(col, resultado);
      console.log('Resultado guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el resultado', error);
    }
  }
}
