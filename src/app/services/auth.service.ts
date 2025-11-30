import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 1. INJEÇÃO DE DEPENDÊNCIAS (Modo Moderno)
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // 2. SINAIS
  currentUser = signal<any | null>(null);
  
  // Sinal para controlar o carregamento da página (Spinner)
  isInitialized = signal(false); 

  constructor() {
    // Executa a verificação assim que o serviço é criado
    this.checkLocalStorage();
  }

  private checkLocalStorage() {
    // Só tenta ler o localStorage se estiver no Navegador
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);

          // Validação extra: verifica se o objeto tem conteúdo
          if (parsedUser && Object.keys(parsedUser).length > 0) {
            this.currentUser.set(parsedUser);
          } else {
            this.currentUser.set(null);
          }
        } catch (e) {
          // Se o JSON estiver quebrado, limpa o usuário
          this.currentUser.set(null);
        }
      }
    }

    // --- O SEGREDO ESTÁ AQUI ---
    // Avisa para o HTML (home.component) que a verificação acabou.
    // Isso faz o Spinner sumir e a página real aparecer.
    this.isInitialized.set(true);
  }

  login(emailRecebido: string, senhaRecebida: string) {
    // Pega o "banco de dados" simulado
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
    this.currentUser.set(userData);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(userData));
    }

    this.router.navigate(['/']);
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