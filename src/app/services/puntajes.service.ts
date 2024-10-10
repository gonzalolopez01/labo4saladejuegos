import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';



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
  async obtenerPuntajesPorUsuario(): Promise<{ usuario: string, puntajeTotal: number }[]> {
    try {
      const col = collection(this.firestore, 'resultados');
      const snapshot = await getDocs(col);
      const resultados = snapshot.docs.map(doc => doc.data()) as { usuario: string, puntaje: number }[];

      
      const puntajesPorUsuario: { [usuario: string]: number } = {};

      resultados.forEach(resultado => {
        if (!puntajesPorUsuario[resultado.usuario]) {
          puntajesPorUsuario[resultado.usuario] = 0;
        }
        puntajesPorUsuario[resultado.usuario] += resultado.puntaje;
      });
      
      const listadoPuntajes = Object.keys(puntajesPorUsuario).map(usuario => ({
        usuario: usuario,
        puntajeTotal: puntajesPorUsuario[usuario]
      }));
      
      listadoPuntajes.sort((a, b) => a.usuario.localeCompare(b.usuario));

      return listadoPuntajes;
      
    } catch (error) {
      console.error('Error al obtener los puntajes', error);
      throw error;
    }
  }
  
  //olbtengo el listado y sumo los puntajes por usuario y juego
  async obtenerPuntajesPorUsuarioYJuego(): Promise<any[]> {
    const resultadosSnapshot = await getDocs(collection(this.firestore, 'resultados'));
    const resultados = resultadosSnapshot.docs.map(doc => doc.data());

    // Agrupar puntajes por usuario y juego
    const puntajesAgrupados: any = {};

    resultados.forEach((resultado: any) => {
      const { usuario, juego, puntaje } = resultado;

      if (!puntajesAgrupados[usuario]) {
        puntajesAgrupados[usuario] = {};
      }

      if (!puntajesAgrupados[usuario][juego]) {
        puntajesAgrupados[usuario][juego] = 0;
      }

      puntajesAgrupados[usuario][juego] += puntaje; // Suma de puntajes
    });

    // Convertir en un arreglo para facilitar la visualización
    const listaPuntajes: any[] = [];

    for (const usuario in puntajesAgrupados) {
      for (const juego in puntajesAgrupados[usuario]) {
        listaPuntajes.push({
          usuario,
          juego,
          puntajeTotal: puntajesAgrupados[usuario][juego],
        });
      }
    }

    return listaPuntajes;
  }
  
}
