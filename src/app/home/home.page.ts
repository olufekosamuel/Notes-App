import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { NoteserviceService } from '../noteservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private noteService: NoteserviceService,private router:Router, private alertCtrl: AlertController, private navCtrl: NavController) {}

  ngOnInit(){
    this.noteService.load()
  }

  addNote(){
    this.alertCtrl.create({
      header: 'New Note',
      message: 'What should the title of this note be?',
      inputs: [
        {
          type: 'text',
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.noteService.createNote(data.title);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  gotonewsinglepage(note){
    this.noteService.currentNote = note;
    this.router.navigate(['/notes/edit']);
  }
}
