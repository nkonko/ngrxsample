import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/model/appstate';
import { Books } from '../store/model/books';
import * as bookActions from '../store/books.action';
import * as appActions from '../../shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';

@Component({
  selector: 'app-insert-book',
  templateUrl: './insert-book.component.html',
  styleUrls: ['./insert-book.component.scss']
})
export class InsertBookComponent {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
  ) { }

  bookForm: Books = {
    id: 0,
    author: '',
    name: '',
    cost: 0
  };

  save() {
    this.store.dispatch(bookActions.insertBook({ newBook: this.bookForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((appstate) => {
      if (appstate.apiStatus === 'success') {
        this.appStore.dispatch(appActions.SetApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        )
        this.router.navigate(['/']);
      }
    });
  }
}
