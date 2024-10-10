import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent implements OnInit {
  form!: FormGroup;
  
  //constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {}
  constructor(private fb: FormBuilder, public auth:Auth, private encuestaService:EncuestaService) {}

  ngOnInit(): void {    
    this.form = this.fb.group(
       {        
        nombre: ['', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
        apellido: ['', [Validators.pattern('^[a-zA-Z]+$'), Validators.required]],
        edad: [null, [Validators.min(18), Validators.max(99), Validators.required]],        
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
        juegoFavorito: ['', Validators.required], 
        entretenimiento: [5, Validators.required],
        recomendacion: ['', Validators.required],
       }      
      );       

  }
 
  get nombre() {
    return this.form.get('nombre');
  }
  get apellido() {
    return this.form.get('apellido');
  }
  get edad() {
    return this.form.get('edad');
  }
  get telefono() {
    return this.form.get('telefono');
  }
  get juegoFavorito() {
    return this.form.get('juegoFavorito');
  }
  get entretenimiento() {
    return this.form.get('entretenimiento');
  }
  get recomendacion() {
    return this.form.get('recomendacion');
  }
  enviarForm() {

    this.form.markAllAsTouched();//todos los controles como si hubiesen sido clickeados(para mostrar errores)

    if(this.form.pristine){//dice si el form fue modificado o no
      console.log("no se modifico");
    }
    console.log(this.auth.currentUser!.email);
    console.log(this.form.value);
    this.encuestaService.enviarEncuesta(this.auth.currentUser!.email as string, this.form.value);
  }
}
