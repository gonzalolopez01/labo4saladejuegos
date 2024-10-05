import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quizCategories = [
    { category: 'geography', page: 2 },
    { category: 'arts%26literature', page: 3 },
    { category: 'entertainment', page: 3 },
    { category: 'science%26nature', page: 2 },
    { category: 'sports%26leisure', page: 3 },
    { category: 'history', page: 2 }
  ];

  private apiUrl = 'https://api.quiz-contest.xyz/questions';
  private apiKey = '$2b$12$hfdUXw5q0dubpjyxp47fAuhyayGX.ZVjmBG1.GoGz2daITyZmqpK6'; // Tu API Key

  constructor(private http: HttpClient) {}

  // Método para obtener preguntas
  //getQuestions(limit: number, page: number, category: string, format: string): Observable<any> {  
  //const url = `${this.apiUrl}?limit=${limit}&page=${page}&category=${category}&format=${format}`;      
  //   const headers = new HttpHeaders({
  //     'Authorization': this.apiKey
  //   });

  //   return this.http.get(url, { headers });
  // }
  
  getQuestions(): Observable<any> {
    let obj = this.getRandomCategoryAndPage();
    const url = `${this.apiUrl}?limit=10&page=${obj.page}&category=${obj.category}&format=multiple`;
    const headers = new HttpHeaders({
      'Authorization': this.apiKey
    });

    return this.http.get(url, { headers });
  }
  getRandomCategoryAndPage(): { category: string, page: number } {
    const randomIndex = Math.floor(Math.random() * this.quizCategories.length);
    const selectedCategory = this.quizCategories[randomIndex];
    
    // Generar un número aleatorio entre 1 y el número de page
    const randomPage = Math.floor(Math.random() * selectedCategory.page) + 1;

    return { category: selectedCategory.category, page: randomPage };
  }
}
