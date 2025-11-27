import { Injectable } from '@angular/core';

// Definição da interface (Tipo do dado)
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  members: string[];
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  // Seus dados vieram para cá
  private projects: Project[] = [
    {
      id: 1,
      title: 'Sistema de Monitoramento',
      description: 'Sistema com sensores de temperatura e umidade conectados à nuvem.',
      image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=300&fit=crop',
      category: 'Robótica',
      date: 'Outubro 2024',
      members: ['Membro 1', 'Membro 2'],
      tags: ['teste', 'iot']
    },
    {
      id: 2,
      title: 'Braço Mecânico',
      description: 'Protótipo de braço robótico controlado por Arduino.',
      image: 'https://images.unsplash.com/photo-1581092160566-3896412f4643?w=400&h=300&fit=crop',
      category: 'Engenharia',
      date: 'Novembro 2024',
      members: ['Membro 3'],
      tags: ['mecânica', 'arduino']
    },
    {
      id: 3,
      title: 'Braço Mecânico',
      description: 'Protótipo de braço robótico controlado por Arduino.',
      image: 'https://images.unsplash.com/photo-1581092160566-3896412f4643?w=400&h=300&fit=crop',
      category: 'Engenharia',
      date: 'Novembro 2024',
      members: ['Membro 3'],
      tags: ['mecânica', 'arduino']
    },
    {
      id: 4,
      title: 'Braço Mecânico',
      description: 'Protótipo de braço robótico controlado por Arduino.',
      image: 'https://images.unsplash.com/photo-1581092160566-3896412f4643?w=400&h=300&fit=crop',
      category: 'Engenharia',
      date: 'Novembro 2024',
      members: ['Membro 3'],
      tags: ['mecânica', 'arduino']
    },
    {
      id: 5,
      title: 'Braço Mecânico',
      description: 'Protótipo de braço robótico controlado por Arduino.',
      image: 'https://images.unsplash.com/photo-1581092160566-3896412f4643?w=400&h=300&fit=crop',
      category: 'Engenharia',
      date: 'Novembro 2024',
      members: ['Membro 3'],
      tags: ['mecânica', 'arduino']
    },


  ];

  constructor() { }

  // Função para pegar todos os projetos
  getProjects(): Project[] {
    return this.projects;
  }

  // Função opcional: Pegar apenas os 3 ou 4 primeiros para a Home
  getFeaturedProjects(): Project[] {
    return this.projects.slice(0, 4); 
  }
}