import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjetosComponent } from './components/projetos/projetos.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ContatoComponent } from './components/contato/contato.component';
import { Component } from '@angular/core';

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
        path: 'contato',
        component: ContatoComponent,
    },
];
