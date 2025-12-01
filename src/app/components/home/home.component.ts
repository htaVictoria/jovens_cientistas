import { Component, NgZone, OnInit } from '@angular/core';
import { ImageSliderComponent } from "./image-slider/image-slider.component";
import { ButtonModule } from 'primeng/button';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { CardModule } from "primeng/card";
import { AuthService } from '../../services/auth.service';
import { Project, ProjetosService } from '../../services/projetos/projetos.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageSliderComponent, ButtonModule, CommonModule, RouterModule, CarouselModule, TagModule, CardModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {

  projetos: Project[] = [];

    responsiveOptions: any[] | undefined;

    constructor(private projetosService: ProjetosService, private router: Router, private viewportScroller: ViewportScroller, public authService: AuthService, private ngZone: NgZone) {}

    ngOnInit() {
        this.projetos = this.projetosService.getProjects();

        this.ngZone.runOutsideAngular(() => {
      
      setInterval(() => {
        
        
      }, 1000);

    });
  

        this.responsiveOptions = [
            {
                breakpoint: '1199px', 
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px', 
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    getSeverity(categoria: string[]): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {

        for(const cat of categoria){
        switch (cat.toLowerCase()) {
            case 'Ciências da Natureza':
                return 'success'; // Verde
            case 'Tecnologia':
                return 'warning'; // Laranja
            case 'Ciências Humanas':
                return 'danger';  // Vermelho
            case 'Matemática':
                return 'info';    // Azul
            case 'física':
                return 'contrast'; // Preto/Escuro
            default:
                return 'secondary'; // Cinza para o resto
        }
        }
        return undefined;

    }

    
}

