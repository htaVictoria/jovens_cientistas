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
  public authService = inject(AuthService);

  constructor(private router: Router) {}

  registerForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    turma: ['', Validators.required],
    areasInteresse: [[]], 
    senha: ['', [Validators.required, Validators.minLength(6)]],
    termos: [false, Validators.requiredTrue] 
  });

  areasOptions = [
    { nome: 'Matemática', code: 'CC' },
    { nome: 'Ciências da Natureza', code: 'BIO' },
    { nome: 'Ciências Humanas', code: 'FIS' },
    { nome: 'Robótica', code: 'ROB' }
  ];

  
  cadastrar() {
    if (this.registerForm.valid) {
      const novoUsuario = this.registerForm.value;
      const bancoDeDados = JSON.parse(localStorage.getItem('bancoUsuarios') || '[]');
      const usuarioExiste = bancoDeDados.find((u: any) => u.email === novoUsuario.email);

      if (usuarioExiste) {
        alert('Este email já está cadastrado!');
        return;
      }

      bancoDeDados.push(novoUsuario);
      localStorage.setItem('bancoUsuarios', JSON.stringify(bancoDeDados));

    localStorage.setItem('user', JSON.stringify(novoUsuario));


    this.authService.currentUser.set(novoUsuario);
    this.router.navigate(['/home']);

    } else {
      alert('Por favor, preencha todos os campos corretamente.');
      this.registerForm.markAllAsTouched();
    }
  }

  
}
