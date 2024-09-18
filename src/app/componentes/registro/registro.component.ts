import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { LoginsService } from '../../services/logins.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  newUserMail: string = "";
  newUserPWD: string = "";

  loggedUser: string = "";
  flagError: boolean = false;
  msjError: string = "";

  //con esta api resolvemos el manejo de los usuarios
  constructor(public auth: Auth, private router: Router, private loginsReg: LoginsService) {//instancio Auth - mas a delante vamos a usar un servicio para poder usarlo desde cualquier componente en vez de instanciar
  }//se registran en firebase Athentication

  Register() {
    //usamos promesa aca
    createUserWithEmailAndPassword(this.auth, this.newUserMail, this.newUserPWD).then((res) => {//en el then la promesa se resolvio correctamente
      if (res.user.email !== null) this.loggedUser = res.user.email; //pasa el usuario a loggedUser

      //this.enviarValor(); 
      this.flagError = false;
      this.loginsReg.LoginReg(this.loggedUser);
      //aca adentro ya puedo hacer el ruteo, entré
      this.router.navigate(['/home']);

    }).catch((e) => {//aca tambien se resolvió la promesa
      this.flagError = true;

      switch (e.code) {
        case "auth/invalid-email":
          this.msjError = "Email invalido";
          break;
        case "auth/email-already-in-use":
          this.msjError = "Email ya en uso";
          break;
        default:
          //en vez de e.code poner algo asi como que no fue posible registrarse, como generico
          this.msjError = e.code
          break;
      }
    });
  }

  //DataService
  // enviarValor(): void {
  //   this.dataService.setMiData(this.loggedUser); // Enviar el valor al servicio
  // }

}
