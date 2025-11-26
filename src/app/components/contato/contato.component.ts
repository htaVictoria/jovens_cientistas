import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

interface Areas {
  nome: string,
}



@Component({
  selector: 'app-contato',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, ButtonModule, CardModule, InputTextModule, FloatLabel, MultiSelectModule, RouterModule, CheckboxModule],
  standalone: true,
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

  onSubmit: any;

    nome!: string;

    email!: string;

  turma: any;



  area!: Areas[];
  areasInteresse!: Areas[];

  constructor() {
    this.area = [
      { nome: 'Matemática' },
      { nome: 'Ciências da Natureza' },
      { nome: 'Ciências Humanas' },
      { nome: 'Robótica' }
    ];
  }


  checked: boolean = false


  
}
