import { createAction, props } from '@ngrx/store';
import { Books } from './model/books';

export const fetchBooks = createAction('[Books API] Fetch Books API');

export const booksFetchAPISuccess = createAction(
  '[Books API] Fetch API Success',
  props<{ allBooks: Books[] }>()
);

export const insertBook = createAction('[Books API] Create book',
  props<{ newBook: Books }>())

export const insertBookSuccess = createAction(
  '[Books API] Create book success',
  props<{ newBook: Books }>()
);

export const updateBook = createAction('[Books API] Update book',
  props<{ updateBook: Books }>()
);

export const updateBookSuccess = createAction(
  '[Books API] Update book success',
  props<{ updateBook: Books }>()
);

export const deleteBook = createAction(
  '[Books API] Delete book',
  props<{id:number}>()
);
 
export const deleteBookSuccess = createAction(
  '[Books API] Deleted book success',
  props<{id:number}>()
);
