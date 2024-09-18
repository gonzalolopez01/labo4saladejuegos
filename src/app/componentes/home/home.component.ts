import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  isUserLoggedIn: boolean = false;
  usuario = '';

  login = 'login';
  logout = 'logout';

  constructor(private dataService: DataService, public auth: Auth){  }

  ngOnInit(): void {
    // Nos suscribimos al observable miData$ del servicio
    this.dataService.miData$.subscribe((nuevoTexto) => {
      this.usuario = nuevoTexto; // Actualizar el valor de texto cuando cambie miData      
    });
  }
}
