import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';

import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { LoginsService } from '../../services/logins.service';

declare var bootstrap: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  title = 'Login';

  userMail: string = "";
  userPWD: string = "";

  loggedUser: string = "";  
  cargando = true;

  constructor(private router: Router, public auth: Auth, private loginsReg: LoginsService){
    
      // Simular una tarea asíncrona
      setTimeout(() => {
        this.cargando = false; // Cuando termine la tarea, ocultar el spinner
      }, 2000);

  }
    
  ngOnInit(): void {
    setTimeout(() => {
      this.cargando = false; // Después de 3 segundos, ocultamos el spinner
    }, 3000);
  }


  Login() {
    signInWithEmailAndPassword(this.auth, this.userMail, this.userPWD).then((res) => {
      //conexion/mail/contraseña
      if (res.user.email !== null) this.loggedUser = res.user.email;

      //aca hacemos el ruteo al home, porque paso la res      
      this.loginsReg.LoginReg(this.loggedUser);
      this.loginsReg.GetDataReg();
      // this.router.navigate(['../']);
      this.router.navigate(['/home']);
      


    }).catch((e) => {//aca tambien se resolvió la promesa      

      switch (e.code) {
        case "auth/invalid-credential":
          //this.msjError = "Email invalido";
          this.toastCredenciales();
          break;
        case "auth/email-already-in-use":
          
          break;
        case "auth/invalid-email":
          this.toastEmail();
          break;
        default:
          this.toastDefault();
          //en vez de e.code poner algo asi como que no fue posible registrarse, como generico
          //this.msjError = e.code
          break;          
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
    //}).catch
    })
  } 

  // navegar() {
  //   if () {
  //     this.router.navigate(['/otra-ruta']);
  //   }
  // }
  toastCredenciales(){    
    var $toast = document.getElementById("miTostada");
    if($toast!=null){
      console.log($toast);
      const body = $toast.querySelector('.toast-body');
      body!.textContent = "Email o contraseña incorrectos";
      console.log(body!.textContent);
      var toastElement = new bootstrap.Toast($toast);
      toastElement.show();
    }  
  } 
  toastEmail(){    
    var $toast = document.getElementById("miTostada");
    if($toast!=null){
      console.log($toast);
      const body = $toast.querySelector('.toast-body');
      body!.textContent = "El usuario debe ser de tipo e-mail";
      console.log(body!.textContent);
      var toastElement = new bootstrap.Toast($toast);
      toastElement.show();
    }  
  } 
 
  toastDefault(){    
    var $toast = document.getElementById("miTostada");
    if($toast!=null){
      console.log($toast);
      const body = $toast.querySelector('.toast-body');
      body!.textContent = "No fue posible logearse";
      console.log(body!.textContent);
      var toastElement = new bootstrap.Toast($toast);
      toastElement.show();
    }  
  } 
  AccesoRapido() {
    this.userMail = "lolo@gmail.com";
    this.userPWD = "123321";
  }
  
}
