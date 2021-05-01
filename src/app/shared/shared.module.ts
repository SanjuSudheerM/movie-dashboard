import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule
  ],
  exports: [
    HeaderComponent,
    InfiniteScrollModule,
  ]
})
export class SharedModule { }
