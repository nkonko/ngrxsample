import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Appstate } from 'src/app/shared/store/model/appstate';
import * as bookActions from '../store/books.action';
import * as appStatusActions from '../../shared/store/app.action';
import { selectBooks } from '../store/books.selector';
import { selectAppState } from 'src/app/shared/store/app.selector';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private store: Store, private appStore: Store<Appstate>) {}

  books$ = this.store.pipe(select(selectBooks));
  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {
     this.deleteModal = new window.bootstrap.Modal(
       document.getElementById('deleteModal')
     );

    this.store.dispatch(bookActions.fetchBooks());
  }

   openDeleteModal(id: number) {
    this.idToDelete = id;
     this.deleteModal.show();
   }

   delete() {
    this.store.dispatch(
      bookActions.deleteBook({
        id: this.idToDelete
      })
    );

    let apiStatus$ = this.appStore.pipe(select(selectAppState));

    apiStatus$.subscribe((appState) => {
      if(appState.apiStatus === 'success') {
        this.deleteModal.hide();
        this.appStore.dispatch(
          appStatusActions.SetApiStatus({ apiStatus: { apiResponseMessage: '', apiStatus: ''}})
        );
      }
    });
   }
}
