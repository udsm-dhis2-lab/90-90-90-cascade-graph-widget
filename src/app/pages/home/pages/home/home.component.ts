import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getListOfFavorites } from 'src/app/store/selectors';
import { State } from 'src/app/store/reducers';
import { LoadFavorite } from 'src/app/store/actions/favorite.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(LoadFavorite());
    this.store.select(getListOfFavorites).subscribe(data => {
      if (data) {
        console.log('DATA::: ' + JSON.stringify(data));
      }
    });
  }
}
