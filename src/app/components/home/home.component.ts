import { Component, NgZone, OnInit } from '@angular/core';
import { ImageSliderComponent } from "./image-slider/image-slider.component";
import { ButtonModule } from 'primeng/button';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Project, ProjetosService } from '../../services/projetos/projetos.service';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { CardModule } from "primeng/card";
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageSliderComponent, ButtonModule, CommonModule, RouterModule, CarouselModule, TagModule, CardModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {

  projetos: Project[] = [];

    // Configuração de responsividade do carrossel
    responsiveOptions: any[] | undefined;

    constructor(private projetosService: ProjetosService, private router: Router, private viewportScroller: ViewportScroller, public authService: AuthService, private ngZone: NgZone) {}

    ngOnInit() {
        this.projetos = this.projetosService.getProjects();

        this.ngZone.runOutsideAngular(() => {
      
      setInterval(() => {
        
        
      }, 1000);

    });
  

        // Configura quantos cards aparecem por tamanho de tela
        this.responsiveOptions = [
            {
                breakpoint: '1199px', // Desktop
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '991px', // Tablet
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px', // Celular
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    // Função que define a cor da etiqueta baseada na Categoria do projeto
    getSeverity(categoria: string): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {
        // Normaliza para minúsculo para evitar erros de digitação (ex: "Robótica" ou "robótica")
        switch (categoria.toLowerCase()) {
            case 'robótica':
                return 'success'; // Verde
            case 'engenharia':
                return 'warning'; // Laranja
            case 'química':
                return 'danger';  // Vermelho
            case 'biologia':
                return 'info';    // Azul
            case 'física':
                return 'contrast'; // Preto/Escuro
            default:
                return 'secondary'; // Cinza para o resto
        }
    }

    
}

