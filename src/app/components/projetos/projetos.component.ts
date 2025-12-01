import { Component, computed, OnInit, signal } from '@angular/core';

import { CardsComponent } from "./cards/cards.component";
import { CommonModule } from '@angular/common';
import { Project, ProjetosService } from '../../services/projetos/projetos.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-projetos',
  imports: [CardsComponent, CommonModule, FormsModule],
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css'
})

export class ProjetosComponent implements OnInit {
  projects: Project[] = [];
  
  selectedCategory = signal<string>('todos');
  searchTerm = signal<string>('');

  categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'Ciências da Natureza', name: 'Ciências da Natureza' },
    { id: 'Ciências Humanas', name: 'Ciências Humanas' },
    { id: 'Matemática', name: 'Matemática' },
    { id: 'Tecnologia', name: 'Tecnologia' }
  ];

  filteredProjects = computed(() => {
    const search = this.searchTerm().toLowerCase().trim(); 
    const category = this.selectedCategory();

    return this.projects.filter(project => {
      const matchesCategory = category === 'todos' || 
                              project.category.includes(category);
      
      const matchesSearch = search === '' || // Se vazio, mostra todos
                           project.title?.toLowerCase().includes(search) ||
                           project.description?.toLowerCase().includes(search);
      
      return matchesCategory && matchesSearch;
    });
  });

  constructor(private projetosService: ProjetosService) {}

  ngOnInit() {
    this.projects = this.projetosService.getProjects();
    console.log('Projetos carregados:', this.projects); 
  }

  selectCategory(categoryId: string) {
    this.selectedCategory.set(categoryId);
    console.log('Categoria selecionada:', categoryId); 
  }

  onSearchChange(value: string) {
    this.searchTerm.set(value);
    console.log('Buscando por:', value); 
    console.log('Projetos filtrados:', this.filteredProjects());
  }
}
