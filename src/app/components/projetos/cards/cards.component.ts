
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports do PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProjetosService } from '../../../services/projetos/projetos.service';
import { Project } from '../cards_interface';





@Component({
  selector: 'app-cards',
  imports: [CommonModule, CardModule, ButtonModule, TagModule, ChipModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})


export class CardsComponent {

  projects: Project[] = [];

  constructor(private projetosService: ProjetosService) {}

  ngOnInit() {
    this.projects = this.projetosService.getProjects();
  }

  // Função para cor da categoria (igual fizemos na Home)
  getSeverity(categoria: string): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {
    switch (categoria.toLowerCase()) {
        case 'robótica': return 'success';
        case 'engenharia': return 'warning';
        case 'química': return 'danger';
        case 'biologia': return 'info';
        case 'física': return 'contrast';
        default: return 'secondary';
    }
  }
}
