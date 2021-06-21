import { Injectable } from '@angular/core';
import { EventStateService } from './event-state.service';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {

  constructor(private state : EventStateService) { }
  getComment(): any []{
    return this.state.getComment();
  }

  addComment(comment: string){
    this.state.addComment(comment);
  }
  updateTimer(newTimer :any){
    this.state.updateTimer(newTimer);
  }

}
