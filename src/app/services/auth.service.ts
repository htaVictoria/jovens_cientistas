import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  currentUser = signal<any | null>(null);
  
  isInitialized = signal(false); 

  constructor() {
    this.checkLocalStorage();
  }

  private checkLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);

          if (parsedUser && Object.keys(parsedUser).length > 0) {
            this.currentUser.set(parsedUser);
          } else {
            this.currentUser.set(null);
          }
        } catch (e) {
          this.currentUser.set(null);
        }
      }
    }


    this.isInitialized.set(true);
  }

  isLogado(): boolean {
    const token = localStorage.getItem('token'); 
    return !!token; 
  }

  login(emailRecebido: string, senhaRecebida: string) {
    const usuariosSalvos = JSON.parse(localStorage.getItem('bancoUsuarios') || '[]');

    const usuarioEncontrado = usuariosSalvos.find((user: any) => {
      return user.email === emailRecebido && user.senha === senhaRecebida;
    });

    if (usuarioEncontrado) {
      this.currentUser.set(usuarioEncontrado);

      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('user', JSON.stringify(usuarioEncontrado));
      }

      this.router.navigate(['/home']);
      return true;
    } else {
      alert('Dados incorretos');
      return false;
    }
  }

  logout() {
    this.currentUser.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }

    this.router.navigate(['/']);
  }

  register(userData: any) {
if (isPlatformBrowser(this.platformId)) {
      const usuariosSalvos = JSON.parse(localStorage.getItem('bancoUsuarios') || '[]');
      
      usuariosSalvos.push(userData);
      
      localStorage.setItem('bancoUsuarios', JSON.stringify(usuariosSalvos));

      this.currentUser.set(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      this.currentUser.set(userData);
    }

    this.router.navigate(['/home']);
  }
  

  updateProfile(novosDados: any) {
    const usuarioAtual = this.currentUser();
    const usuarioAtualizado = { ...usuarioAtual, ...novosDados };

    this.currentUser.set(usuarioAtualizado);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(usuarioAtualizado));
    }
  }
}