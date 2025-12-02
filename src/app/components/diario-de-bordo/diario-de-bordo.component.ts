import { Component, OnInit, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Importe isPlatformBrowser
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';

interface LogEntry {
  id: string;
  title: string;
  date: Date;
  content: string;
  tags: string;
  observations: string;
  materials: string;
  createdAt: string;
}

@Component({
  selector: 'app-diario-de-bordo',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    CalendarModule,
    CardModule,
    DialogModule,
    TagModule,
    ChipModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    ToolbarModule,
    DividerModule,
    PanelModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './diario-de-bordo.component.html',
  styleUrl: './diario-de-bordo.component.css'
})
export class DiarioDeBordoComponent implements OnInit {

  entries = signal<LogEntry[]>([]);
  displayDialog = signal(false);
  editingId = signal<string | null>(null);
  searchTerm = signal('');
  selectedTag: any = null;

  tagOptions: any[] = [];

  newEntry = signal<Omit<LogEntry, 'id' | 'createdAt'>>({
    title: '',
    date: new Date(),
    content: '',
    tags: '',
    observations: '',
    materials: ''
  });

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) { }

  ngOnInit() {
    this.loadEntries();
    
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  
  }

  loadEntries() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('science_logbook_entries');
      if (stored) {
        const entries = JSON.parse(stored).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        this.entries.set(entries.sort((a: LogEntry, b: LogEntry) =>
          b.date.getTime() - a.date.getTime()
        ));
        this.updateTagOptions();
      }
    }
  }

  saveToLocalStorage(entries: LogEntry[]) {
    if (isPlatformBrowser(this.platformId)) {
      const entriesToSave = entries.map(entry => ({
        ...entry,
        date: entry.date.toISOString()
      }));
      localStorage.setItem('science_logbook_entries', JSON.stringify(entriesToSave));
    }
  }

  updateTagOptions() {
    const tags = this.entries().flatMap(e =>
      e.tags.split(',').map(t => t.trim()).filter(t => t)
    );
    const uniqueTags = [...new Set(tags)];
    this.tagOptions = [
      { label: 'Todas as tags', value: null },
      ...uniqueTags.map(tag => ({ label: tag, value: tag }))
    ];
  }

  openDialog() {
    this.displayDialog.set(true);
  }

  closeDialog() {
    this.displayDialog.set(false);
    this.resetForm();
  }

  saveEntry() {
    const current = this.newEntry();

    if (!current.title || !current.content) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Por favor, preencha o título e o conteúdo!'
      });
      return;
    }

    const entry: LogEntry = {
      ...current,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updatedEntries = [entry, ...this.entries()];
    this.entries.set(updatedEntries);
    this.saveToLocalStorage(updatedEntries);
    this.updateTagOptions();

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Registro salvo com sucesso!'
    });

    this.closeDialog();
  }

  updateEntry() {
    const current = this.newEntry();
    const editId = this.editingId();

    if (!editId) return;

    const updatedEntry: LogEntry = {
      ...current,
      id: editId,
      createdAt: this.entries().find(e => e.id === editId)?.createdAt || new Date().toISOString()
    };

    const updatedEntries = this.entries().map(e =>
      e.id === editId ? updatedEntry : e
    );

    this.entries.set(updatedEntries);
    this.saveToLocalStorage(updatedEntries);
    this.updateTagOptions();

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Registro atualizado com sucesso!'
    });

    this.closeDialog();
  }

  confirmDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Deseja excluir esta página?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteEntry(id);
      }
    });
  }

  deleteEntry(id: string) {
    const updatedEntries = this.entries().filter(e => e.id !== id);
    this.entries.set(updatedEntries);
    this.saveToLocalStorage(updatedEntries);
    this.updateTagOptions();

    this.messageService.add({
      severity: 'info',
      summary: 'Excluído',
      detail: 'Registro excluído com sucesso!'
    });
  }

  startEdit(entry: LogEntry) {
    this.newEntry.set({
      title: entry.title,
      date: new Date(entry.date),
      content: entry.content,
      tags: entry.tags,
      observations: entry.observations,
      materials: entry.materials
    });
    this.editingId.set(entry.id);
    this.displayDialog.set(true);
  }

  resetForm() {
    this.newEntry.set({
      title: '',
      date: new Date(),
      content: '',
      tags: '',
      observations: '',
      materials: ''
    });
    this.editingId.set(null);
  }

  updateField(field: keyof Omit<LogEntry, 'id' | 'createdAt'>, value: any) {
    this.newEntry.update(current => ({ ...current, [field]: value }));
  }

  getFilteredEntries(): LogEntry[] {
    const search = this.searchTerm().toLowerCase();
    const tag = this.selectedTag?.toLowerCase();

    return this.entries().filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(search) ||
        entry.content.toLowerCase().includes(search);
      const matchesTag = !tag || entry.tags.toLowerCase().includes(tag);
      return matchesSearch && matchesTag;
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  getTagArray(tags: string): string[] {
    return tags.split(',').map(t => t.trim()).filter(t => t);
  }

  getSeverityForTag(index: number): string {
    const severities = ['success', 'info', 'warning', 'danger', 'secondary'];
    return severities[index % severities.length];
  }

  
  isLargeScreen(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth >= 768;
    }
    return true; 
  }

  isMobile(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth < 768;
    }
    return false; 
  }

  
}