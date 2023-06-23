import { IonicModule } from '@ionic/angular';
import { ChatButtonComponent } from './chat-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ChatButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ChatButtonComponent]
})
export class ChatButtonModule { }
