import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Books } from './model/books';

export const selectBooks = createFeatureSelector<Books[]>('mybooks');

export const selectBookById = (bookId: number) =>
  createSelector(selectBooks, (books: Books[]) => {

    let bookById = books.filter((b) => b.id === bookId);

    if (bookById.length === 0) {
      return null;
    }

    return bookById[0];
  })
