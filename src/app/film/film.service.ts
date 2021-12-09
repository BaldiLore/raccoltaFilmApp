import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Film } from './film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiServer = 'http://localhost:8080/api/film';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getFilms(): Observable<Film[]> {

    return this.http.get<Film[]>(this.apiServer).pipe(
      catchError(this.handleError)
    );

  }

  getFilmById(id: number): Observable<Film> {

    return this.http.get<Film>(this.apiServer + '/' + id.toString()).pipe(
      catchError(this.handleError)
    );
  }

  create(filmInput: Film): Observable<Film> {
    return this.http.post<Film>(this.apiServer, JSON.stringify(filmInput), this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  delete(filmInput?: Film): Observable<Film> {
    return this.http.delete<Film>(this.apiServer + '/' + filmInput?.id?.toString(), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  update(filmInput?: Film): Observable<Film> {
    return this.http.put<Film>(this.apiServer + '/' + filmInput?.id?.toString(), filmInput, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      err.error?.errors?.forEach((element: { message: string; }) => {
        errorMessage += element.message;
      });
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
