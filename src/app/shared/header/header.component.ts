import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu'; // <--- Importante
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Para pipes comuns se precisar
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, 
    MatToolbarModule, 
    RouterModule, 
    MatButtonModule, 
    MatSidenavModule, 
    MatListModule,
    MatMenuModule // <--- Adicione aqui
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  authService = inject(AuthService);
  
  // Acessamos o sinal diretamente no HTML, mas podemos criar um helper se quiser
  user = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}