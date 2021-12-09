import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-delete',
  templateUrl: './film-delete.component.html',
  styleUrls: ['./film-delete.component.css']
})
export class FilmDeleteComponent implements OnInit {

  film: Film = new Film();
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.filmService.getFilmById(id)?.subscribe(
      filmItem => this.film = filmItem,
      err => this.errorMessage = err
    )
  }

  delete(){
    this.filmService.delete(this.film).subscribe({
      next: () => {},
      complete: () => this.router.navigate([`film/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } }),
      error: () => this.errorMessage = "L'operazione non è stata eseguita."
    });
  }

}
