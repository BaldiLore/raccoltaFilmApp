import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Regista } from 'src/app/regista/regista';
import { RegistaService } from 'src/app/regista/regista.service';
import { Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-update',
  templateUrl: './film-update.component.html',
  styleUrls: ['./film-update.component.css']
})
export class FilmUpdateComponent implements OnInit {

  film: Film = new Film();
  listaRegisti: Regista[] = [];
  errorMessage: string = '';
  dataPubblicazioneString: string | null = '';

  constructor(
    private registaService: RegistaService, 
    private router: Router,
    private filmService: FilmService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.registaService.getRegisti().subscribe(registaList => this.listaRegisti = registaList);
    this.filmService.getFilmById(id)?.subscribe(
      filmItem => {
        this.film = filmItem;
        this.dataPubblicazioneString = this.datePipe.transform(filmItem?.dataPubblicazione, 'yyyy-MM-dd');
      },
      err => this.errorMessage = err
    )
  }

  update(filmForm: NgForm){

    if (filmForm.valid) {
      this.filmService.update(this.film).subscribe({
        next: (filmItem: Film) => this.film = filmItem,
        complete: () => this.router.navigate([`film/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } }),
        error: () => this.errorMessage = "L'operazione non è stata eseguita."
      });
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }
  }
}
