import { createReducer, on } from '@ngrx/store';
import * as bookActions from './books.action';
import { Books } from './model/books';

export const initialState: ReadonlyArray<Books> = [];

export const bookReducer = createReducer(
  initialState,

  on(bookActions.booksFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
  }),

  on(bookActions.insertBookSuccess, (state, {newBook}) => {
    let newState = [...state];
    newState.unshift(newBook);
    return newState;
  }),

  on(bookActions.updateBookSuccess,(state, {updateBook}) => {
    let newState = state.filter((b) => b.id != updateBook.id);
    newState.unshift(updateBook);
    return newState;
  }),

  on(bookActions.deleteBookSuccess, (state, { id }) => {
    let newState = state.filter((b) => b.id != id);
    return newState;
  })


);
