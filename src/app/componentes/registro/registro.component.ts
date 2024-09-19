import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { LoginsService } from '../../services/logins.service';

declare var bootstrap: any;

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
  small: string ='';
  strong: string = '';

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
          //this.msjError = "Email invalido";
          this.toastEmailInvalido();
          break;
        case "auth/email-already-in-use":
          //this.msjError = "Email ya en uso";
          //this.msjError = "Email ya en uso";          
          this.toastEmailYaEnUso();
          //this.showToast();
          break;
        default:
          this.toastDefault();
          //en vez de e.code poner algo asi como que no fue posible registrarse, como generico
          //this.msjError = e.code
          break;          
      }
    });
    
  }
  
  toastEmailYaEnUso(){    
    var $toast = document.getElementById("miTostada");
    if($toast!=null){
      console.log($toast);
      const body = $toast.querySelector('.toast-body');
      body!.textContent = "Email ya en uso";
      console.log(body!.textContent);
      var toastElement = new bootstrap.Toast($toast);
      toastElement.show();
    }  
  } 
  toastEmailInvalido(){    
    var $toast = document.getElementById("miTostada");
    if($toast!=null){
      console.log($toast);
      const body = $toast.querySelector('.toast-body');
      body!.textContent = "Email Invalido";
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
      body!.textContent = "No fue posible registrar la cuenta";
      console.log(body!.textContent);
      var toastElement = new bootstrap.Toast($toast);
      toastElement.show();
    }  
  } 
  showToast(){
    var $toast = document.getElementById("miTostada");
    var toastElement = new bootstrap.Toast($toast);
    toastElement.show();
  } 

}
