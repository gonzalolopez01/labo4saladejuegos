import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, query } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginsService {
  public loginsCollection:any[] = [];
  //public user:string = "";
  public countLogins:number = 0;
  private sub!:Subscription;

  constructor(private firestore: Firestore) { }

  LoginReg(user:string) {//ESCRITURA
    let col = collection(this.firestore, 'logins');//con collection instanciamos la collection de firebase

    //creo objeto que voy a guardar con la fecha y con los datos recogidos
    let obj = { fecha: new Date(), "user": user};    

    addDoc(col, obj);//con esta funcion agrego el objeto a la coleccion    
  }  

  GetDataReg(){//LECTURA
    //no esta de mas hacer validaciones, en este caso igual sabemos lo que nos estan mandando
    let col = collection(this.firestore, 'logins');//instanciamos la col que queremos leer
        
    const filteredQuery = query(//armamos la query para indicar que es lo que vamos a buscar
      col
      //se le puede agregar estas clausulas
      //,where('user','==','agustin@gmail.com) //campo, condicion, valor que se espera  // trae el los campos en el que el campo user sea igual al email pasado
      //,limit(2) //que traiga solo 2
      //,orderBy("fecha", "desc")
    );
    
    const observable = collectionData(filteredQuery);
    
    //en this.sub me guardo la suscripcion para en algun momento poder desubcribirme y dejar de consumir recursos
    this.sub = observable.subscribe((respuesta:any) => {//suscripcion. vamos a estar pendientes de lo que traiga el observable
      
      this.loginsCollection = respuesta; //Actualizamos nuestro array

      this.countLogins = this.loginsCollection.length;//Actualizamos la cantidad de registros que contiene la colección (Ejemplo propuesto en clase)

      console.log(respuesta);      
    })
  }
}
