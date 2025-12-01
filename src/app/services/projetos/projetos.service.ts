import { Injectable } from '@angular/core';

// Definição da interface (Tipo do dado)
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string[];
  members: string[];
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  private projects: Project[] = [
    {
      id: 1,
      title: 'Labirinto cerebral: entendendo o cérebro e as doenças psiquiátricas',
      description: 'Sistema com sensores de temperatura e umidade conectados à nuvem.',
      image: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=300&fit=crop',
      category: ['Ciências da Natureza'],
      members: ['Breno do Carmo Oliveira', 'Miguel Elohim dos Santos Nascimento', 'Stephany Bonfim Santos'],
      tags: ['teste', 'iot']
    },
    {
      id: 2,
      title: 'Projeto Arm – Protótipo de mão robótica para auxiliar pessoas com Parkinson',
      description: 'Protótipo de braço robótico controlado por Arduino.',
      image: 'https://images.unsplash.com/photo-1581092160566-3896412f4643?w=400&h=300&fit=crop',
      category: ['biologia'],
      members: ['Maria Eduarda Nascimento de Jesus', 'Rebeca Vitória Costa Lopes', 'Marcos Evangelista das Neves Neto', 'Isadora Carvalho de Jesus'],
      tags: ['mecânica', 'arduino']
    },
    {
      id: 3,
      title: 'Do litoral à mesa: impactos da poluição marinha na vida humana e animal',
      description: 'Protótipo de braço robótico controlado por Arduino.',
      image: 'https://images.unsplash.com/photo-1581092160566-3896412f4643?w=400&h=300&fit=crop',
      category: [''],
      members: ['Isabela Silva Costa de Souza', 'Melissa Reis Bueno'],
      tags: ['mecânica', 'Biologia']
    },
    {
      id: 4,
      title: 'Entre fibras e formas: padrões e geometria das tranças afro-brasileiras',
      description: 'Protótipo de braço robótico controlado por Arduino.',
      image: 'https://images.unsplash.com/photo-1581092160566-3896412f4643?w=400&h=300&fit=crop',
      category: ['Matemática'],
      members: ['Ágatha Victória Bonfim da Rocha', 'Damilly da Silva Santos'],
      tags: ['Etnomatemática', 'Geometria', 'Cultura Afro-brasileira']
    },
    {
      id: 5,
      title: 'Protótipo de escola do futuro: inclusiva e tecnológica',
      description: 'Protótipo de braço robótico controlado por Arduino.',
      image: 'https://images.unsplash.com/photo-1581092160566-3896412f4643?w=400&h=300&fit=crop',
      category: ['Ciências Humanas', ' Tecnologia'],
      members: ['Cauã Souza de Oliveira', 'Thalita Moreira dos Santos', 'Luane Ferreira dos Santos'],
      tags: ['Educação Inclusiva', 'Tecnologia Assistiva']
    },
    {
      id: 6,
      title: 'Diário audiovisual do clube de ciências: documentário maker',
      description: '',
      image: '',
      category: ['Ciências Humanas'],
      members: [''],
      tags: ['Educação', 'Comunicação', 'Tecnologias Digitais'],
    },
    {
      id: 7,
      title: 'Laboratório Maker',
      description: '',
      image: '',
      category: ['Tecnologia'],
      members: [''],
      tags: [''],
    },


  ];

  constructor() { }

  getProjects(): Project[] {
    return this.projects;
  }

  getFeaturedProjects(): Project[] {
    return this.projects.slice(0, 4); 
  }
}