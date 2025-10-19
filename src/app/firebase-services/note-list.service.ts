import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, doc, collection, onSnapshot, addDoc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Note } from '../interfaces/note.interface';
import { object } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  trashNotes:Note[]= [];
  normalNotes:Note[]=[];
  firestore:Firestore = inject(Firestore);

  unsubNoteList;
  unsubTrashList;
  // unsingle;

  constructor() { 
    this.unsubTrashList = this.subTrashList();
    this.unsubNoteList = this.subNotesList();


    // this.unsingle = onSnapshot(this.getSingleDocRef('notes', 'KW1QRINuSZuWe8wEXhEY'), (list)=>{
    //     console.log(list.data());
    // })

  }

  ngOnDestroy(){
    this.unsubNoteList();
    this.unsubTrashList();
  }

  subTrashList(){
    return onSnapshot(this.getTrashRef(), (list)=>{
      this.trashNotes = [];
      list.forEach(element =>{
        this.trashNotes.push(this.setNoteObject(element.id, element.data()))
      })
    })
  }

  subNotesList(){
    return onSnapshot(this.getNotesRef(), (list)=>{
      this.normalNotes = [];
      list.forEach(element =>{
        this.normalNotes.push(this.setNoteObject(element.id, element.data()))
      })
    })
  }

  setNoteObject(id:string, object:any): Note{
      return {
        id: id,
        type: object.type || 'note',
        title:object.title || "",
        content: object.content || '',
        marked: object.marked || false
      }
  }

  getTrashRef(){
    return collection(this.firestore, 'trash');
  }

  getNotesRef(){
    return collection(this.firestore, 'note');
  }

  getSingleDocRef(colId:string, docId:string){
      return doc(collection(this.firestore, colId), docId)
  }

  moveNotes(colId:string, item:Note){
    if(colId ==='note'){
      this.addNoteRef(item);
    }else{
      this.addNoteTrash(item);
    }
  }

  /**
   * Move a note document from the 'note' collection to the 'trash' collection.
   * This creates a new document in the destination and removes the original.
   */
  async moveNoteToTrash(note: Note){
    try{
      const toSave = { ...note, type: 'trash' } as Note;
      const docRef = await addDoc(this.getTrashRef(), toSave);
      await setDoc(docRef, { ...toSave, id: docRef.id });
      if(note.id){
        await this.deleteNote('note', note.id);
      }
    }catch(error){
      console.warn('moveNoteToTrash error', error);
    }
  }

  /**
   * Restore a note document from 'trash' back to 'note'.
   */
  async moveNoteToNotes(note: Note){
    try{
      const toSave = { ...note, type: 'note' } as Note;
      const docRef = await addDoc(this.getNotesRef(), toSave);
      await setDoc(docRef, { ...toSave, id: docRef.id });
      if(note.id){
        await this.deleteNote('trash', note.id);
      }
    }catch(error){
      console.warn('moveNoteToNotes error', error);
    }
  }


  async addNoteRef(item: Note) {
    try {
      const docRef = await addDoc(this.getNotesRef(), item);
      await setDoc(docRef, { ...item, id: docRef.id });
    } catch (error) {
      console.warn(error);
    }
  }

  async addNoteTrash(item: Note) {
    try {
      const docRef = await addDoc(this.getTrashRef(), item);
      await setDoc(docRef, { ...item, id: docRef.id });
    } catch (error) {
      console.warn(error);
    }
  }




  async updateNote(note:Note){
    try{
      if(note.id){
        await updateDoc(this.getSingleDocRef(note.type, note.id), this.getCleanJson(note));
      }
    }catch(error){
      console.warn(error)
    }
  }

  async deleteNote(colId:string, noteId:string){
    try{
      await deleteDoc(this.getSingleDocRef(colId, noteId));
    }catch(error){
      console.error(error);
    }
  }

  getCleanJson(note:Note):{}{
    return {
      id: note.id,
      type:note.type,
      title:note.title,
      content:note.content,
      marked: note.marked
    }

  }


}
