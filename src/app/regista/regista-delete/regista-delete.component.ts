import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Regista } from '../regista';
import { RegistaService } from '../regista.service';

@Component({
  selector: 'app-regista-delete',
  templateUrl: './regista-delete.component.html',
  styleUrls: ['./regista-delete.component.css']
})
export class RegistaDeleteComponent implements OnInit {

  regista?: Regista = new Regista();
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private registaService: RegistaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.registaService.getRegistaById(id)?.subscribe(
      registaItem => this.regista = registaItem,
      err => this.errorMessage = err
    )
  }

  delete(){
    this.registaService.delete(this.regista).subscribe({
      next: () => {},
      complete: () => this.router.navigate([`regista/list`], { queryParams: { confirmMessage: 'Operazione effettuata correttamente.' } }),
      error: () => this.errorMessage = "L'operazione non è stata eseguita."
    });
  }

}
