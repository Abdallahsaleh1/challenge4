import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectorService } from '../services/selector.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private httpClient : HttpClient,private selector : SelectorService) { }

  allComments :any  = [];
  loopCounter=0;
  allEvents: any = [];
  Events: any = [];
  timer = 0;
  show = false;

  ngOnInit(): void {
    this.httpClient.get("assets/session-events.json").subscribe(data =>{
      console.log(data);
      this.allEvents = data;
      for (let i = 0 ;i< this.allEvents.length;i++){
        if (this.allEvents[i].type == 4){

          let eventPlayTime =0;
          let duration = this.allEvents[i+1].timestamp - this.allEvents[i].timestamp;
          let date = new Date(this.allEvents[i].timestamp *1000);

          var hours = date.getHours();

          var minutes = "0" + date.getMinutes();

          var seconds = "0" + date.getSeconds();

          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          
          if (this.loopCounter != 0 ) {
             eventPlayTime = this.allEvents[i].timestamp - this.allEvents[0].timestamp;
          }
  
          this.Events[this.loopCounter]=({"description": "visit Page Event","time" : formattedTime,"type": 4,"duration": duration, "playTime": eventPlayTime});
          this.loopCounter = this.loopCounter + 1;

        }
        if (this.allEvents[i].type == 3){
          if(this.allEvents[i].data.source == 2){
            if(this.allEvents[i].data.type == 2){

              let eventPlayTime =0;
              let duration = this.allEvents[i+1].timestamp - this.allEvents[i].timestamp;
              let date = new Date(this.allEvents[i].timestamp *1000);
              var hours = date.getHours();

              var minutes = "0" + date.getMinutes();

              var seconds = "0" + date.getSeconds();

              var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

              if (this.loopCounter != 0 ) {
                eventPlayTime = ~~((this.allEvents[i].timestamp - this.allEvents[0].timestamp)/1000);
             }

  
              this.Events[this.loopCounter]=({"description": "Click Event", "time" : formattedTime ,"type": 3, "duration": duration, "playTime": eventPlayTime});
              this.loopCounter = this.loopCounter + 1;
            }
          }
        }
        
      }
      
    })
    
    this.allComments = this.selector.getComment();
 
  }

  Play(){
    this.show = true;

    var inter = setInterval(() => { 
      if( this.timer == 29){
        this.timer = 0; 
        let eventsContainer: HTMLElement = document.getElementById("container") as HTMLElement;
        eventsContainer.scrollTop = 0;
        this.show = false;

        clearInterval(inter);
      }
      document.getElementById("container")?.scrollBy(0,1);
      this.timer = this.timer + 1;
      this.selector.updateTimer(this.timer);
      

      }, 500);
  }

}
