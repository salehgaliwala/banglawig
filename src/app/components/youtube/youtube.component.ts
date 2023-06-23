import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss'],
})
export class YoutubeComponent implements OnInit {
 playTime = 0.0;
  constructor() { }

  ngOnInit() {
    let startTimer = setInterval(()=>{
      this.playTime += 0.01;
      if (this.playTime === 1.0){
        clearInterval(startTimer);
      }
    },100);
  }


  youtube(event){
    console.log(event);
  }
}
