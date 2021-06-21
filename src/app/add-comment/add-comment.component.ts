import { Component, OnInit } from '@angular/core';
import { SelectorService } from '../services/selector.service';
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  comment :string = "";
  constructor(private selector : SelectorService) { }

  ngOnInit(): void {
  }

  addComment(){
  this.selector.addComment(this.comment);  
  }
}
