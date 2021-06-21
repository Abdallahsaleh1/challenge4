import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventStateService {

private comments:any = []; 
private timer :any =0;
getComment(): any []{
  return this.comments;
}

addComment(comment :string){
  this.comments.push({"comment":comment,"occ":this.timer});
}

updateTimer(newTimer :any){
this.timer = newTimer;
}

}
