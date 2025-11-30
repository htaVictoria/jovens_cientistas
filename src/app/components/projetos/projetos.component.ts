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
  searchTerm = signal<string>(''); // ← MUDANÇA AQUI

  categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'biologia', name: 'Biologia' },
    { id: 'fisica', name: 'Física' },
    { id: 'quimica', name: 'Química' },
    { id: 'astronomia', name: 'Astronomia' }
  ];

  filteredProjects = computed(() => {
    const search = this.searchTerm().toLowerCase().trim(); // ← MUDANÇA AQUI
    const category = this.selectedCategory();

    return this.projects.filter(project => {
      // Filtro de categoria
      const matchesCategory = category === 'todos' || 
                              project.category === category;
      
      // Filtro de busca
      const matchesSearch = search === '' || // Se vazio, mostra todos
                           project.title?.toLowerCase().includes(search) ||
                           project.description?.toLowerCase().includes(search);
      
      return matchesCategory && matchesSearch;
    });
  });

  constructor(private projetosService: ProjetosService) {}

  ngOnInit() {
    this.projects = this.projetosService.getProjects();
    console.log('Projetos carregados:', this.projects); // ← DEBUG
  }

  selectCategory(categoryId: string) {
    this.selectedCategory.set(categoryId);
    console.log('Categoria selecionada:', categoryId); // ← DEBUG
  }

  onSearchChange(value: string) {
    this.searchTerm.set(value);
    console.log('Buscando por:', value); // ← DEBUG
    console.log('Projetos filtrados:', this.filteredProjects()); // ← DEBUG
  }
}
