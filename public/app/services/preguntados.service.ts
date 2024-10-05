import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple';

  constructor(private http: HttpClient) { }

  getPreguntas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
