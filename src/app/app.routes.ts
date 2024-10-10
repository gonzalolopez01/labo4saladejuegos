import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home/juegos', redirectTo: '/home', pathMatch: 'full' },
    { 
        path: 'home', component: HomeComponent,
        children:
        [
            { path: 'login', component: LoginComponent },
            { path: 'registro', component: RegistroComponent },
            {
                path: 'juegos',
                loadChildren: () => import('./modules/juegos/juegos.module').then(m => m.JuegosModule)
            },
            { path: 'encuesta', component: EncuestaComponent },
        ]
    },
//    { path: 'about', component: QuienSoyComponent },    
    { path: '**', component: PageNotFoundComponent }
];
