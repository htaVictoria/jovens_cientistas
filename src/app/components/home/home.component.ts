import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { CardModule } from "primeng/card";

// Seus componentes e serviços
import { ImageSliderComponent } from "./image-slider/image-slider.component";
import { AuthService } from '../../services/auth.service';
import { Project, ProjetosService } from '../../services/projetos/projetos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ImageSliderComponent, 
    ButtonModule, 
    CarouselModule, 
    TagModule, 
    CardModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {

  projetos: Project[] = [];
  responsiveOptions: any[] | undefined;

  constructor(
    private projetosService: ProjetosService, 
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.projetos = this.projetosService.getProjects();
    
    console.log("HOME INICIADA. Usuário atual:", this.authService.currentUser());

    this.responsiveOptions = [
        { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
        { breakpoint: '991px', numVisible: 2, numScroll: 1 },
        { breakpoint: '767px', numVisible: 1, numScroll: 1 }
    ];
  }

  getSeverity(categorias: string[]): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {
    if (!categorias || categorias.length === 0) return undefined;

    const catPrincipal = categorias[0].toLowerCase();

    switch (catPrincipal) {
        case 'ciências da natureza': return 'success'; 
        case 'tecnologia': return 'warning'; 
        case 'ciências humanas': return 'danger'; 
        case 'matemática': return 'info';    
        case 'física': return 'contrast';
        default: return 'secondary'; 
    }
  }
}