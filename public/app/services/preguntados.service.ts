import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private apiUrl = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple';

  quizCategories = [
    { category: 'geography', count: 2 },
    { category: 'arts%26literature', count: 3 },
    { category: 'entertainment', count: 3 },
    { category: 'science%26nature', count: 2 },
    { category: 'sports%26leisure', count: 3 },
    { category: 'history', count: 2 }
  ];

  constructor(private http: HttpClient) { }

  getPreguntas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
