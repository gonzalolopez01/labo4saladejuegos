import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';

import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { LoginsService } from '../../services/logins.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, public auth: Auth, private loginsReg: LoginsService){
  }
  title = 'Login';

  userMail: string = "";
  userPWD: string = "";

  loggedUser: string = "";  

  Login() {
    signInWithEmailAndPassword(this.auth, this.userMail, this.userPWD).then((res) => {
      //conexion/mail/contraseña
      if (res.user.email !== null) this.loggedUser = res.user.email;

      //aca hacemos el ruteo al home, porque paso la res
      console.log("logeado con exito");
      this.loginsReg.LoginReg(this.loggedUser);
      this.loginsReg.GetDataReg();
      this.router.navigate(['../']);


    }).catch((e) => 
      console.log(e)
      //aca informamos al usuario el error
      //flagError = true
      //y hacemos el tema del switch como antes
    )
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

  // navegar() {
  //   if () {
  //     this.router.navigate(['/otra-ruta']);
  //   }
  // }
  
}
