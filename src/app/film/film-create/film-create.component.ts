import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Regista } from 'src/app/regista/regista';
import { RegistaService } from 'src/app/regista/regista.service';
import { Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-create',
  templateUrl: './film-create.component.html',
  styleUrls: ['./film-create.component.css']
})
export class FilmCreateComponent implements OnInit {

  film: Film = new Film();
  listaRegisti: Regista[] = [];
  errorMessage: string = '';

  constructor(
    private registaService: RegistaService, 
    private router: Router,
    private filmService: FilmService
  ) { }

  ngOnInit(): void {
    this.registaService.getRegisti().subscribe(registaList => this.listaRegisti = registaList);
  }

  create(filmForm: NgForm){

    if (filmForm.valid) {
      this.filmService.create(this.film).subscribe(
        filmItem => this.film = filmItem,
        err => this.errorMessage = err,
        () => this.router.navigate([`/film/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
      );
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }
  }

}
