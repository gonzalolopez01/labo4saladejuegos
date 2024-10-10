import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  isUserLoggedIn: boolean = true;
  usuario = '';

  login = 'login';
  logout = 'logout';

  isChildActive: boolean = false;
  chat = false;
  cargando = false;

  constructor(private dataService: DataService, public auth: Auth, private router: Router){  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {        
          // Muestra el spinner cuando empieza la navegación
                    
          this.cargando = true;                  
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        // Oculta el spinner cuando termina la navegación
        this.cargando = false;
      }
    });
  }

  ngOnInit(): void {
    // Nos suscribimos al observable miData$ del servicio
    this.dataService.miData$.subscribe((nuevoTexto) => {
      this.usuario = nuevoTexto; // Actualizar el valor de texto cuando cambie miData      
    });
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isChildActive = event.url !== '/home';        
      }
    });
    
  }
  CloseSession(){
    signOut(this.auth).then(() => {
      //console.log(this.auth.currentUser?.email)
      //aca podemos hacer el ruteo al login porque se cerro la sesion
      //console.log("logout con exito");
      
      //this.router.navigate(['../']);
      this.router.navigate(['/home']);
      this.chat = false;
    //}).catch
    })
  } 


  abrirChat(){
    this.chat = !this.chat;
  }
  toggleChat() {
    this.chat = !this.chat;
  }
  abrirEncuesta(){
    this.router.navigate(['/home/encuesta']);
    
  }
}
