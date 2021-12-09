import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome/welcome.component';
import { RegistaListComponent } from './regista/regista-list/regista-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistaShowComponent } from './regista/regista-show/regista-show.component';
import { RegistaUpdateComponent } from './regista/regista-update/regista-update.component';
import { DatePipe } from '@angular/common';
import { RegistaDeleteComponent } from './regista/regista-delete/regista-delete.component';
import { RegistaCreateComponent } from './regista/regista-create/regista-create.component';
import { FilmListComponent } from './film/film-list/film-list.component';
import { FilmCreateComponent } from './film/film-create/film-create.component';
import { FilmShowComponent } from './film/film-show/film-show.component';
import { FilmUpdateComponent } from './film/film-update/film-update.component';
import { FilmDeleteComponent } from './film/film-delete/film-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    WelcomeComponent,
    RegistaListComponent,
    RegistaShowComponent,
    RegistaUpdateComponent,
    RegistaDeleteComponent,
    RegistaCreateComponent,
    FilmListComponent,
    FilmCreateComponent,
    FilmShowComponent,
    FilmUpdateComponent,
    FilmDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
