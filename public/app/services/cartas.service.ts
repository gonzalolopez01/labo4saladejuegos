import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Carta } from '../clases/carta';
import { Observable } from 'rxjs';

export interface Card {
  value: string;
  suit: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  http = inject(HttpClient);
  // constructor(private http: HttpClient) { }
  idMazo!: string;
  
  getMazo(){
    return this.http.get<any>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');    
  }

//  getCarta(id:string): Observable<Card>{
  getCarta(id:string){
    return this.http.get<any>('https://deckofcardsapi.com/api/deck/'+id+'/draw/?count=1');
  }

  // drawCard(deckId: string): Observable<Carta> {
  //   return this.http.get<Carta>('https://deckofcardsapi.com/api/deck/'+deckId+'/draw/?count=1');
  // }
  shuffle(id:string){
    return this.http.get<any>('https://deckofcardsapi.com/api/deck/'+id+'/shuffle/');
  }
}
