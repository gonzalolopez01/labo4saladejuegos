import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

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

  constructor(private dataService: DataService, public auth: Auth, private router: Router){  }

  ngOnInit(): void {
    // Nos suscribimos al observable miData$ del servicio
    this.dataService.miData$.subscribe((nuevoTexto) => {
      this.usuario = nuevoTexto; // Actualizar el valor de texto cuando cambie miData      
    });
  }
  CloseSession(){
    signOut(this.auth).then(() => {
      //console.log(this.auth.currentUser?.email)
      //aca podemos hacer el ruteo al login porque se cerro la sesion
      //console.log("logout con exito");
      this.router.navigate(['../']);
    //}).catch
    })
  } 
}
