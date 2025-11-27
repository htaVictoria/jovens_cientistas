import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal para guardar o estado do usuário (null = não logado)
  currentUser = signal<any>(null);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Verifica se está no navegador antes de acessar localStorage
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        this.currentUser.set(JSON.parse(user));
      }
    }
  }

  login(credentials: any) {
    // Simulação: cria um objeto de usuário
    const user = { nome: 'Estudante', email: credentials.email };

    this.currentUser.set(user); // Atualiza o sinal

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    this.router.navigate(['/']);
  }

  logout() {
    this.currentUser.set(null); // Limpa o sinal
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }

    this.router.navigate(['/']);
  }

  register(userData: any) {
    // Lógica de registro...
    this.currentUser.set(userData);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(userData));
    }

    this.router.navigate(['/']);
  }

  updateProfile(novosDados: any) {
    const usuarioAtual = this.currentUser();

    // Mescla os dados antigos com os novos
    const usuarioAtualizado = { ...usuarioAtual, ...novosDados };

    this.currentUser.set(usuarioAtualizado);

    // Salva no localStorage apenas se estiver no navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(usuarioAtualizado));
    }
  }
}