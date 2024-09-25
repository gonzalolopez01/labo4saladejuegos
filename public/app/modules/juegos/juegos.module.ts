import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayoromenorComponent } from './componentes/mayoromenor/mayoromenor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';

@NgModule({
  declarations: [
    AhorcadoComponent,
    MayoromenorComponent,
    PreguntadosComponent,
    QuiensoyComponent    
  ],
  imports: [    
    CommonModule,    
    JuegosRoutingModule
  ],
  exports: [
    AhorcadoComponent,
    MayoromenorComponent,
    PreguntadosComponent,
    QuiensoyComponent    
  ]

})
export class JuegosModule { }
