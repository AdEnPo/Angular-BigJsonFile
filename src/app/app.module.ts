import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { PostsComponent } from './components/posts/posts.component';


import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from'ngx-spinner';
import { from } from 'rxjs';
import { FilterPipe } from './components/filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
