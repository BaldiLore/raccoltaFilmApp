import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Regista } from '../regista';
import { RegistaService } from '../regista.service';

@Component({
  selector: 'app-regista-update',
  templateUrl: './regista-update.component.html',
  styleUrls: ['./regista-update.component.css']
})
export class RegistaUpdateComponent implements OnInit {

  errorMessage: string = '';
  regista: Regista = new Regista();
  dataNascitaString: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private registaService: RegistaService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.registaService.getRegistaById(id)?.subscribe(
      registaItem => {
        this.regista = registaItem;
        this.dataNascitaString = this.datePipe.transform(registaItem?.dataDiNascita, 'yyyy-MM-dd');
      },
      err => this.errorMessage = err
    )
  }

  update(registaForm: NgForm) {

    if (registaForm.valid) {
      this.registaService.update(this.regista).subscribe({
        next: (registaItem: Regista) => this.regista = registaItem,
        complete: () => this.router.navigate([`regista/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } }),
        error: () => this.errorMessage = "L'operazione non è stata eseguita."
      });
    } else {
      this.errorMessage = 'Attenzione! Operazione fallita! Il form non è stato validato'
    }
  }

}
