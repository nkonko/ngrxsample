import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BooksRoutingModule } from './books-routing.module';

import { HomeComponent } from './home/home.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { bookReducer } from './store/books.reducer';
import { BooksEffect } from './store/books.effect';
import { InsertBookComponent } from './insert-book/insert-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

@NgModule({
  declarations: [HomeComponent, InsertBookComponent, EditBookComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    StoreModule.forFeature('mybooks', bookReducer),
    EffectsModule.forFeature([BooksEffect]),
  ],
})
export class BooksModule {}
