import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NoteserviceService } from '../noteservice.service';
import { Note } from '../interface/note';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  note;
    constructor(private noteService:NoteserviceService, private navCtrl:NavController, private route:ActivatedRoute) { 
   

  }

  ngOnInit() {
     // Get the id of the note from the URL
     //let noteId = this.route.snapshot.paramMap.get('id');
     this.note = this.noteService.currentNote;
  }

  noteChanged(){
    this.noteService.save();
  }

  deleteNote(){
    this.noteService.deleteNote(this.note);
    this.navCtrl.navigateBack('/notes');
  }

}
