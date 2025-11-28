import { Component, inject } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { Router, RouterModule } from '@angular/router';import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


interface Areas {
  nome: string,
}



@Component({
  selector: 'app-contato',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, ReactiveFormsModule, ButtonModule, CardModule, InputTextModule, FloatLabel, MultiSelectModule, RouterModule, CheckboxModule,PasswordModule, CommonModule],
  standalone: true,
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

    nome!: string;
    email!: string;
    turma: any;



  area!: Areas[];
  areasInteresse!: Areas[];
  

  checked: boolean = false

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registerForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    turma: ['', Validators.required],
    areasInteresse: [[]], // Array vazio inicial
    senha: ['', [Validators.required, Validators.minLength(6)]],
    // O segredo para o termo obrigatório é o Validators.requiredTrue
    termos: [false, Validators.requiredTrue] 
  });

  // Opções para o multiselect (Exemplo)
  areasOptions = [
    { nome: 'Matemática', code: 'CC' },
    { nome: 'Ciências da Natureza', code: 'BIO' },
    { nome: 'Ciências Humanas', code: 'FIS' },
    { nome: 'Robótica', code: 'ROB' }
  ];

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
    } else {
      // Marca todos os campos como tocados para exibir os erros na tela
      this.registerForm.markAllAsTouched();
    }
  }


  
}
