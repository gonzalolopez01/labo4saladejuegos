import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router){

  }
  title = 'Login';

  usuarios : Usuario[] = [];

  nombre! : string;
  clave! : string;  

  login(nombre:string, clave:string){
    this.cargarUsuarios();    

    if(this.verificarUsuario(nombre, clave)){
      this.router.navigate(['/home'])
      console.log("bienvenido");
    }else{
      this.router.navigate(['login/error'])
      console.log("error");
    }
  }
  reset(){
    this.nombre = "";
    this.clave = "";    
  }
  cargarUsuarios(){
    const strUsuarios = localStorage.getItem("usuarios");
    
    if(strUsuarios){
      const usuariosParseados = JSON.parse(strUsuarios || '[]');      
      
      this.usuarios = usuariosParseados.map((user: any) => new Usuario(user.nombre, user.clave));
      
    }
    else{
      console.log('No hay usuarios guardados en el Local Storage');
    }
  }
  verificarUsuario(nombre: string, clave: string): boolean{    
    for (let usuario of this.usuarios) {      
      if (usuario.nombre === nombre && usuario.clave === clave) {
        return true;
      }
    }
    return false;
  }

}
