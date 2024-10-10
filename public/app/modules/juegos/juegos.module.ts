import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayoromenorComponent } from './componentes/mayoromenor/mayoromenor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { CrucigramaComponent } from './componentes/crucigrama/crucigrama.component';
import { FormsModule } from '@angular/forms';
import { SimonComponent } from './componentes/simon/simon.component';

@NgModule({
  declarations: [
    AhorcadoComponent,
    MayoromenorComponent,
    PreguntadosComponent,
    QuiensoyComponent,
    CrucigramaComponent,
    SimonComponent
  ],
  imports: [    
    CommonModule,    
    JuegosRoutingModule,
    FormsModule
  ],
  exports: [
    AhorcadoComponent,
    MayoromenorComponent,
    PreguntadosComponent,
    QuiensoyComponent,
    CrucigramaComponent,
    SimonComponent
  ]

})
export class JuegosModule { }
