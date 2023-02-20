import { Injectable } from '@angular/core';

import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { BooksService } from '../service/books.service';
import { selectBooks } from './books.selector';
import { Appstate } from '../../shared/store/model/appstate';
import * as appStatus from 'src/app/shared/store/app.action';
import * as bookActions from './books.action';

@Injectable()
export class BooksEffect {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  loadAllBoks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.fetchBooks),
      withLatestFrom(this.store.pipe(select(selectBooks))),
      mergeMap(([, bookformStore]) => {
        if (bookformStore.length > 0) {
          return EMPTY;
        }
        return this.booksService
          .get()
          .pipe(
            map((data) => bookActions.booksFetchAPISuccess({ allBooks: data }))
          );
      })
    )
  );

  saveNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.insertBook),
      switchMap((action) => {
        this.appStore.dispatch(
          appStatus.SetApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        )
        return this.booksService.create(action.newBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              appStatus.SetApiStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return bookActions.insertBookSuccess({ newBook: data })
          })
        )
      })
    ))

  updateNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.updateBook),
      switchMap((action) => {
        this.appStore.dispatch(
          appStatus.SetApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.update(action.updateBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              appStatus.SetApiStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return bookActions.updateBookSuccess({ updateBook: data })
          })
        )
      })
    )
  )

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.deleteBook),
      switchMap((actions) => {
        this.appStore.dispatch(
          appStatus.SetApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              appStatus.SetApiStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' }
              })
            )
            return bookActions.deleteBookSuccess({ id: actions.id });
          })
        )
      })
    ))


}
