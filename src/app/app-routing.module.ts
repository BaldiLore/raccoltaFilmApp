import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmCreateComponent } from './film/film-create/film-create.component';
import { FilmDeleteComponent } from './film/film-delete/film-delete.component';
import { FilmListComponent } from './film/film-list/film-list.component';
import { FilmShowComponent } from './film/film-show/film-show.component';
import { FilmUpdateComponent } from './film/film-update/film-update.component';
import { RegistaCreateComponent } from './regista/regista-create/regista-create.component';
import { RegistaDeleteComponent } from './regista/regista-delete/regista-delete.component';
import { RegistaListComponent } from './regista/regista-list/regista-list.component';
import { RegistaShowComponent } from './regista/regista-show/regista-show.component';
import { RegistaUpdateComponent } from './regista/regista-update/regista-update.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  
  { path: 'regista/list', component: RegistaListComponent },
  { path: 'regista/show/:id', component: RegistaShowComponent },
  { path: 'regista/update/:id', component: RegistaUpdateComponent },
  { path: 'regista/delete/:id', component: RegistaDeleteComponent },
  { path: 'regista/create', component: RegistaCreateComponent },

  { path: 'film/list', component: FilmListComponent },
  { path: 'film/create', component: FilmCreateComponent },
  { path: 'film/show/:id', component: FilmShowComponent },
  { path: 'film/update/:id', component: FilmUpdateComponent },
  { path: 'film/delete/:id', component: FilmDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
