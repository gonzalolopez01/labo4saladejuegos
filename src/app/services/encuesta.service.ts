import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private firestore:Firestore) { }

  enviarEncuesta(user:string, encuesta:object) {//ESCRITURA
    let col = collection(this.firestore, 'encuesta');

    //creo objeto que voy a guardar con la fecha y con los datos recogidos
    let obj = { fecha: new Date(), "user": user, encuesta};    

    addDoc(col, obj);//con esta funcion agrego el objeto a la coleccion    
  }  
}
