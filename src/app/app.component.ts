import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Usuario } from './clases/usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Sala de Juegos';
  
  usuario1 : Usuario = new Usuario('juan', '1234');
  usuario2 : Usuario = new Usuario('pedro', '1234');
  usuario3 : Usuario = new Usuario('laura', '1234');

  constructor(private router: Router){

  }
  
  ngOnInit(): void {
    
    this.guardarUsuarios();

  }
  
  guardarUsuarios(){
    const usuarios = [this.usuario1, this.usuario2, this.usuario3];
    const usuarioString = JSON.stringify(usuarios);
    localStorage.setItem("usuarios", usuarioString);  
  }
}
