import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../services/auth.service';
import { Password } from "primeng/password";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    ToastModule,
    AvatarModule,
    Password
],
  providers: [MessageService], // Necessário para o Toast
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private construtorFormulario = inject(FormBuilder);
  private authService = inject(AuthService);
  private servicoMensagem = inject(MessageService);
  private roteador = inject(Router);

  // Sinal para controlar se está editando ou não
  estaEditando = signal(false);

  formularioPerfil: FormGroup = this.construtorFormulario.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['']
    // Adicione outros campos se necessário
  });

  ngOnInit() {
    const usuario = this.authService.currentUser();
    
    if (usuario) {
      // Preenche o formulário com os dados atuais
      this.formularioPerfil.patchValue({
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
      });
    } else {
      // Se não tiver usuário (entrou pela URL direto), manda pro login
      this.roteador.navigate(['/login']);
    }

    // Começa com o formulário desabilitado
    this.formularioPerfil.disable();
  }

  alternarEdicao() {
    if (!this.estaEditando()) {
      // ATIVAR EDIÇÃO: Libera os campos
      this.estaEditando.set(true);
      this.formularioPerfil.enable();
    } else {
      // CANCELAR EDIÇÃO: Reverte os dados e bloqueia
      this.estaEditando.set(false);
      this.formularioPerfil.disable();
      
      // Recarrega os dados originais do usuário
      const usuario = this.authService.currentUser();
      if (usuario) {
        this.formularioPerfil.patchValue(usuario);
      }
    }
  }

  salvarAlteracoes() {
    if (this.formularioPerfil.valid) {
      // Chama o serviço para atualizar
      this.authService.updateProfile(this.formularioPerfil.value);

      // Feedback visual
      this.servicoMensagem.add({ 
        severity: 'success', 
        summary: 'Sucesso', 
        detail: 'Dados atualizados!' 
      });

      // Volta para modo de leitura (bloqueado)
      this.estaEditando.set(false);
      this.formularioPerfil.disable();
    }
  }
}