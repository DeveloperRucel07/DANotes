import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoteListComponent } from './note-list/note-list.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NoteListComponent, FooterComponent, HeaderComponent, AddNoteDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Notes');
  addDialogOpen = false;
}
