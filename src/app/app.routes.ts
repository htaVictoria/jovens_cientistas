import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ContatoComponent } from './components/contato/contato.component';
import { PoliticaDePrivacidadeComponent } from './components/contato/politica-de-privacidade/politica-de-privacidade.component';
import { TermosDeUsoComponent } from './components/contato/termos-de-uso/termos-de-uso.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DiarioDeBordoComponent } from './components/diario-de-bordo/diario-de-bordo.component';

export const routes: Routes = [

    {
        path: '',
        component:HomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'projetos',
        component: ProjetosComponent,
    },
    {
        path: 'quem-somos',
        component: SobreComponent,
    },
    {
        path: 'politica-privacidade',
        component: PoliticaDePrivacidadeComponent,
    },
    {
        path: 'termos-de-uso',
        component: TermosDeUsoComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'cadastro',
        component: ContatoComponent
    },
    { path: 'perfil', component: ProfileComponent },
    { path: 'diario-de-bordo', component: DiarioDeBordoComponent},

];
