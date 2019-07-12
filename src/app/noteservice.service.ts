import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Note } from './interface/note';

@Injectable({
  providedIn: 'root'
})
export class NoteserviceService {
  public notes: Note[] = [];
  public loaded: boolean = false;
  public currentNote: any;

  constructor(private storage: Storage) { } 

  load(): Promise<boolean> {

    return new Promise((resolve) => {

      this.storage.get('notes').then((notes) => {

        if(notes != null){
          this.notes = notes;
        }

        this.loaded = true;
        resolve(true);

      });

    });

  }
  save(){
    this.storage.set('notes', this.notes);
  }

  getNote(id){
    return this.notes.find(note => note.id === id)
  }

  createNote(title){
    let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;
    this.notes.push({
      id: id.toString(),
      title: title,
      content: ''
    });
    
    this.save();
  }

  deleteNote(note): void {

    let index = this.notes.indexOf(note);

    if(index > -1){
      this.notes.splice(index, 1);
      this.save();
    }

  }
}
