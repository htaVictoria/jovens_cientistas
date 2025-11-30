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
import { ScrollingModule } from '@angular/cdk/scrolling';


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
    MatMenuModule, ScrollingModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public authService = inject(AuthService);
  

  logout() {
    this.authService.logout();
  }
}