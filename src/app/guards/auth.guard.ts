// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLogado()) {
      return true;
    }

    // Redirecionar para login se não estiver autenticado
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
}

// src/app/guards/no-auth.guard.ts
@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isLogado()) {
      return true;
    }

    // Redirecionar para home se já estiver autenticado
    this.router.navigate(['/home']);
    return false;
  }
}