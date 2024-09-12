import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorOmenorComponent } from './componentes/mayor-omenor/mayor-omenor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { ChatComponent } from './componentes/chat/chat.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'ahorcado', component: AhorcadoComponent },
    { path: 'mayoromenor', component: MayorOmenorComponent },
    { path: 'preguntados', component: PreguntadosComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'quiensoy', component: QuienSoyComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'about', component: QuienSoyComponent },
    { path: '**', component: PageNotFoundComponent }
];
