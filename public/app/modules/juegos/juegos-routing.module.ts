import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { MayoromenorComponent } from './componentes/mayoromenor/mayoromenor.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { CrucigramaComponent } from './componentes/crucigrama/crucigrama.component';
import { SimonComponent } from './componentes/simon/simon.component';


const routes: Routes = [
  {
    path: 'ahorcado',
    component:AhorcadoComponent
  },
  {
    path: 'preguntados',
    component:PreguntadosComponent
  },
  {
    path: 'mayoromenor',
    component:MayoromenorComponent
  },  
  {
    path: 'quiensoy',
    component:QuiensoyComponent
  },
  {
    path: 'simon',
    component:SimonComponent
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
