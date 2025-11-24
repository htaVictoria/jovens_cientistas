
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Project } from '../cards_interface';





@Component({
  selector: 'app-cards',
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})


export class CardsComponent {

  @Input() project!: Project;
  @Output() viewDetails = new EventEmitter<Project>();
  @Output() share = new EventEmitter<Project>();

  onViewDetails() {
    this.viewDetails.emit(this.project);
  }

  onShare() {
    this.share.emit(this.project);
  }



}
