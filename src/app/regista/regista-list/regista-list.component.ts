import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Regista } from '../regista';
import { RegistaService } from '../regista.service';

@Component({
  selector: 'app-regista-list',
  templateUrl: './regista-list.component.html',
  styleUrls: ['./regista-list.component.css']
})
export class RegistaListComponent implements OnInit, OnDestroy {

  listaRegisti: Regista[] = [];
  sub?: Subscription;
  confirmMessage: string = '';
  errorMessage: string = '';

  constructor(
    private registaService: RegistaService, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.registaService.getRegisti().subscribe(
      registi => this.listaRegisti = registi,
      err => {
        this.errorMessage = err;
        this.listaRegisti = [];
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

  ngOnDestroy(): void {
    this.sub?.unsubscribe;
  }

}
