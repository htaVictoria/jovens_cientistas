import { Component } from '@angular/core';

import { CardsComponent } from "./cards/cards.component";
import { CommonModule } from '@angular/common';
import { Project } from './cards_interface';


@Component({
  selector: 'app-projetos',
  imports: [CardsComponent, CommonModule],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css'
})
export class ProjetosComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'projeto teste ',
      description: 'Sistema de monitoramento climático com sensores de temperatura, umidade e pressão conectados à nuvem.',
      image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=300&fit=crop',
      category: 'Robótica',
      date: 'Outubro 2024',
      members: ['membro_do_clube_1', 'membro_do_clube_2'],
      tags: ['teste', 'teste', 'teste']
    },
    {
      id: 2,
      title: 'projeto teste ',
      description: 'Sistema de monitoramento climático com sensores de temperatura, umidade e pressão conectados à nuvem.',
      image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=300&fit=crop',
      category: 'Robótica',
      date: 'Outubro 2024',
      members: ['membro_do_clube_1', 'membro_do_clube_2'],
      tags: ['teste', 'teste', 'teste']
    },
    {
      id: 3,
      title: 'projeto teste ',
      description: 'Sistema de monitoramento climático com sensores de temperatura, umidade e pressão conectados à nuvem.',
      image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=300&fit=crop',
      category: 'Robótica',
      date: 'Outubro 2024',
      members: ['membro_do_clube_1', 'membro_do_clube_2'],
      tags: ['teste', 'teste', 'teste']
    },
    {
      id: 4,
      title: 'projeto teste ',
      description: 'Sistema de monitoramento climático com sensores de temperatura, umidade e pressão conectados à nuvem.',
      image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=300&fit=crop',
      category: 'Robótica',
      date: 'Outubro 2024',
      members: ['membro_do_clube_1', 'membro_do_clube_2'],
      tags: ['teste', 'teste', 'teste']
    },
    {
      id: 5,
      title: 'projeto teste ',
      description: 'Sistema de monitoramento climático com sensores de temperatura, umidade e pressão conectados à nuvem.',
      image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=300&fit=crop',
      category: 'Robótica',
      date: 'Outubro 2024',
      members: ['membro_do_clube_1', 'membro_do_clube_2'],
      tags: ['teste', 'teste', 'teste']
    },
    {
      id: 6,
      title: 'projeto teste ',
      description: 'Sistema de monitoramento climático com sensores de temperatura, umidade e pressão conectados à nuvem.',
      image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=300&fit=crop',
      category: 'Robótica',
      date: 'Outubro 2024',
      members: ['membro_do_clube_1', 'membro_do_clube_2'],
      tags: ['teste', 'teste', 'teste']
    }
  ];

    constructor() {
    console.log('Projetos carregados:', this.projects); // ← Adicione isso
  }

  handleViewDetails(project: Project) {
    console.log('Ver detalhes do projeto:', project);
    // Aqui você pode navegar para uma página de detalhes ou abrir um dialog
  }

}
