import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';

import * as bookActions from '../store/books.action';
import * as appStatus from '../../shared/store/app.action';
import { Appstate } from 'src/app/shared/store/model/appstate';
import { selectBookById } from '../store/books.selector';
import { Books } from '../store/model/books';
import { selectAppState } from 'src/app/shared/store/app.selector';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) { }

  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        let id = Number(params.get('id'));
        return this.store.pipe(select(selectBookById(id)));
      })
    );

    fetchData$.subscribe((data) => {
      if (data) {
        this.bookForm = { ...data };
      }
      else {
        this.router.navigate(['/']);
      }
    })

  }

  bookForm: Books = {
    id: 0,
    author: '',
    name: '',
    cost: 0
  };

  update() {
    this.store.dispatch(
      bookActions.updateBook({ updateBook: { ...this.bookForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((appState) => {
      if (appState.apiStatus === 'success') {
        this.appStore.dispatch(
          appStatus.SetApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    })
  }

}

