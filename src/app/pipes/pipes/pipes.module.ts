import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SafeHtmlPipe],
  imports: [
    CommonModule
  ],
  exports: [SafeHtmlPipe]
})
export class PipesModule { }
