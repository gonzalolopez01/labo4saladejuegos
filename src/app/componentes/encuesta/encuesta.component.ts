import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';

declare var bootstrap: any;

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent implements OnInit {
  form!: FormGroup;

  isLoading = false;
  
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
  // enviarForm() {

  //   this.form.markAllAsTouched();//todos los controles como si hubiesen sido clickeados(para mostrar errores)

  //   if(this.form.pristine){//dice si el form fue modificado o no
  //     console.log("no se modifico");
  //   }
  //   console.log(this.auth.currentUser!.email);
  //   console.log(this.form.value);
  //   this.encuestaService.enviarEncuesta(this.auth.currentUser!.email as string, this.form.value);
  // }
  enviarForm() {
    this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    if (this.form.invalid) {
      return; // Si el formulario es inválido, no continuar
    }

    this.isLoading = true;  // Mostrar spinner

    const formData = this.form.value;
    const userEmail = this.auth.currentUser!.email as string;

    this.encuestaService.enviarEncuesta(userEmail, formData).subscribe({
      next: (response) => {
        console.log('Formulario enviado exitosamente', response);
        this.toastSucces();
        this.isLoading = false;  //oculto spinner
        this.form.reset();  //reset form
      },
      error: (err) => {
        console.error('Error al enviar el formulario', err);
        this.toastError();
        this.isLoading = false;
      }
    });
  }
  toastError(){    
    var $toast = document.getElementById("miTostada");
    if($toast!=null){
      console.log($toast);
      const body = $toast.querySelector('.toast-body');
      body!.textContent = "No fue posible enviar el formulario";
      console.log(body!.textContent);
      var toastElement = new bootstrap.Toast($toast);
      toastElement.show();
    }  
  } 
  toastSucces(){    
    var $toast = document.getElementById("miTostada2");
    if($toast!=null){
      console.log($toast);
      const body = $toast.querySelector('.toast-body');
      body!.textContent = "Formulario enviado con exito";
      console.log(body!.textContent);
      var toastElement = new bootstrap.Toast($toast);
      toastElement.show();
    }  
  } 
}
