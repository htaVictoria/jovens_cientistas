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
    AvatarModule
  ],
  providers: [MessageService], // Necessário para o Toast
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  // Signal para controlar se está editando ou não
  isEditing = signal(false);

  profileForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    turma: [''],
    // Adicione outros campos se necessário
  });

  ngOnInit() {
    const user = this.authService.currentUser();
    
    if (user) {
      // Preenche o formulário com os dados atuais
      this.profileForm.patchValue({
        nome: user.nome,
        email: user.email,
        turma: user.turma
      });
    } else {
      // Se não tiver usuário (entrou pela URL direto), manda pro login
      this.router.navigate(['/login']);
    }

    // Começa com o formulário desabilitado
    this.profileForm.disable();
  }

  toggleEdit() {
    if (this.isEditing()) {
      // CANCELAR EDIÇÃO: Reverte os dados e bloqueia
      this.isEditing.set(false);
      this.profileForm.disable();
      // Recarrega os dados originais do signal
      const user = this.authService.currentUser();
      if(user) this.profileForm.patchValue(user);

    } else {
      // ATIVAR EDIÇÃO: Libera os campos
      this.isEditing.set(true);
      this.profileForm.enable();
    }
  }

  saveChanges() {
    if (this.profileForm.valid) {
      // Chama o serviço para atualizar
      this.authService.updateProfile(this.profileForm.value);
      
      // Feedback visual
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Dados atualizados!' });
      
      // Volta para modo de leitura
      this.isEditing.set(false);
      this.profileForm.disable();
    }
  }
}