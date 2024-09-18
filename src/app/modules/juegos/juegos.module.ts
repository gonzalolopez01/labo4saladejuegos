import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorOmenorComponent } from '../../../../public/app/componentes/mayor-omenor/mayor-omenor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { QuienSoyComponent } from '../../../../public/app/componentes/quien-soy/quien-soy.component';
import { ChatComponent } from './componentes/chat/chat.component';





@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorOmenorComponent,
    PreguntadosComponent,
    QuienSoyComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ],
  exports: [
    AhorcadoComponent,
    MayorOmenorComponent,
    PreguntadosComponent,
    QuienSoyComponent,
    ChatComponent
  ]

})
export class JuegosModule { }
