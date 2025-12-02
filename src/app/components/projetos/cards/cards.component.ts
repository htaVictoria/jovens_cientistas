
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Project, ProjetosService } from '../../../services/projetos/projetos.service';
import { DialogModule } from 'primeng/dialog';





@Component({
  selector: 'app-cards',
  imports: [CommonModule, CardModule, ButtonModule, TagModule, ChipModule,
    MatButtonModule,
    MatIconModule, DialogModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})


export class CardsComponent {

  @Input() projects: Project[] = [];

    mostrarDialog: boolean = false;
    projetoSelecionado: Project | null = null;


  constructor(private projetosService: ProjetosService) {}

  ngOnInit() {
    this.projects = this.projetosService.getProjects();
  }


  getSeverity(categoria: string): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {
    switch (categoria.toLowerCase()) {
        case 'robótica': return 'success';
        case 'Ciências da Natureza': return 'warning';
        case 'Ciências Humanas': return 'danger';
        case 'Matemática': return 'info';
        case 'Tecnologia': return 'contrast';
        default: return 'secondary';
    }
  }


    abrirDetalhes(project: Project) {
    console.log('Projeto clicado:', project);
    this.projetoSelecionado = project;
    this.mostrarDialog = true;
    console.log('Projeto selecionado:', this.projetoSelecionado);
  }
}
