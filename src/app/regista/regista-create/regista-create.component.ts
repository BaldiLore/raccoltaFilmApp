import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Regista } from '../regista';
import { RegistaService } from '../regista.service';

@Component({
  selector: 'app-regista-create',
  templateUrl: './regista-create.component.html',
  styleUrls: ['./regista-create.component.css']
})
export class RegistaCreateComponent implements OnInit {

  regista: Regista = new Regista();
  errorMessage: string = '';

  constructor(
    private registaService: RegistaService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(registaForm: NgForm){
    if (registaForm.valid) {
      this.registaService.create(this.regista).subscribe(
        registaItem => this.regista = registaItem,
        err => this.errorMessage = err,
        () => this.router.navigate([`/regista/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } })
      );
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }
  }

}
