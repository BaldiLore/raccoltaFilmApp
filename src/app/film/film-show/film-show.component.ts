import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-show',
  templateUrl: './film-show.component.html',
  styleUrls: ['./film-show.component.css']
})
export class FilmShowComponent implements OnInit {

  film: Film = new Film();

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.filmService.getFilmById(id)?.subscribe(film => this.film = film);
  }

}
