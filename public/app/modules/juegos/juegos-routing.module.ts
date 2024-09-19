import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { MayoromenorComponent } from './componentes/mayoromenor/mayoromenor.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { QuienSoyComponent } from '../../../../public/app/componentes/quien-soy/quien-soy.component';

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
    path: 'chat',
    component:ChatComponent
  },
  {
    path: 'quiensoy',
    component:QuienSoyComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
