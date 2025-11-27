import { Component, OnInit } from '@angular/core';

import { CardsComponent } from "./cards/cards.component";
import { CommonModule } from '@angular/common';
import { Project } from './cards_interface';
import { ProjetosService } from '../../services/projetos/projetos.service';


@Component({
  selector: 'app-projetos',
  imports: [CardsComponent, CommonModule],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css'
})

export class ProjetosComponent implements OnInit {
    projects: Project[] = [];
  
    constructor(private projetosService: ProjetosService) {}
  
    ngOnInit() {
      // Agora a lista vem do mesmo lugar da Home!
      this.projects = this.projetosService.getProjects();
    }
}
