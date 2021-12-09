import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Regista } from '../regista';
import { RegistaService } from '../regista.service';

@Component({
  selector: 'app-regista-show',
  templateUrl: './regista-show.component.html',
  styleUrls: ['./regista-show.component.css']
})
export class RegistaShowComponent implements OnInit {

  regista?: Regista = new Regista();

  constructor(
    private route: ActivatedRoute,
    private registaService: RegistaService
  ) { }

  ngOnInit(): void {
    this.getRegistaById();
  }

  getRegistaById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.registaService.getRegistaById(id)?.subscribe(regista => this.regista = regista);
  }
  
}
