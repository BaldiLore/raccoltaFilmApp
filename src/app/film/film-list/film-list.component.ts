import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  listaFilms: Film[] = [];
  confirmMessage: string = '';
  errorMessage: string = '';

  constructor(
    private filmService: FilmService, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(
      films => this.listaFilms = films,
      err => {
        this.errorMessage = err;
        this.listaFilms = [];
      }
    );

    //verifico presenza messaggio nei query params
    this.route
      .queryParams
      .subscribe(params => {
        // se non è presente il confirmMessage non faccio nulla
        this.confirmMessage = params['confirmMessage'] ? params['confirmMessage'] : '';
      });
  }

}
