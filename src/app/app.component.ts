import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    FooterComponent, 
    HeaderComponent, 
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'jovens_cientistas';
  showHeaderFooter: boolean = true;

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private router: Router
  ) {
    iconRegistry.addSvgIcon('instagram', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/instagram.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
    iconRegistry.addSvgIcon('whatsapp', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/whatsapp.svg'));

    // Escuta mudanças de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Lista de rotas onde NÃO deve aparecer header/footer
      const rotasSemLayout = ['/politica-privacidade', '/termos-de-uso', '/login'];
      
      this.showHeaderFooter = !rotasSemLayout.includes(event.url);
    });
  }
}