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
],
  providers: [MessageService], 
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private construtorFormulario = inject(FormBuilder);
  private authService = inject(AuthService);
  private servicoMensagem = inject(MessageService);
  private roteador = inject(Router);

  estaEditando = signal(false);

  formularioPerfil: FormGroup = this.construtorFormulario.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['']
  });

  ngOnInit() {
    const usuario = this.authService.currentUser();
    
    if (usuario) {
      this.formularioPerfil.patchValue({
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha
      });
    } else {
      this.roteador.navigate(['/login']);
    }

    this.formularioPerfil.disable();
  }

  alternarEdicao() {
    if (!this.estaEditando()) {
      this.estaEditando.set(true);
      this.formularioPerfil.enable();
    } else {
      this.estaEditando.set(false);
      this.formularioPerfil.disable();
      
      const usuario = this.authService.currentUser();
      if (usuario) {
        this.formularioPerfil.patchValue(usuario);
      }
    }
  }

  salvarAlteracoes() {
    if (this.formularioPerfil.valid) {
      this.authService.updateProfile(this.formularioPerfil.value);

      this.servicoMensagem.add({ 
        severity: 'success', 
        summary: 'Sucesso', 
        detail: 'Dados atualizados!' 
      });

      this.estaEditando.set(false);
      this.formularioPerfil.disable();
    }
  }
}