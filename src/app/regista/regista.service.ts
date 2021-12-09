import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Regista } from './regista';

@Injectable({
  providedIn: 'root'
})
export class RegistaService {

  private apiServer = 'http://localhost:8080/api/regista';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  searchRegisti(queryParams: Map<string, string>): Observable<any> {
    let httpParams = new HttpParams();
    queryParams.forEach((value: string, key: string) => {
      if (value !==null && value !== undefined)
        httpParams = httpParams.set(key, value);
    });
    return this.http.get<any>(this.apiServer + '/search', { params: httpParams }).pipe(
      catchError(this.handleError)
    );

  }

  getRegisti(): Observable<Regista[]> {

    return this.http.get<Regista[]>(this.apiServer).pipe(
      catchError(this.handleError)
    );

  }

  getRegistaById(id: number): Observable<Regista> {

    return this.http.get<Regista>(this.apiServer + '/' + id.toString()).pipe(
      catchError(this.handleError)
    );
  }

  create(registaInput: Regista): Observable<Regista> {
    return this.http.post<Regista>(this.apiServer, JSON.stringify(registaInput), this.httpOptions).pipe(
      catchError(this.handleError)
    )
  }

  delete(registaInput?: Regista): Observable<Regista> {
    return this.http.delete<Regista>(this.apiServer + '/' + registaInput?.id?.toString(), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  update(registaInput?: Regista): Observable<Regista> {
    return this.http.put<Regista>(this.apiServer + '/' + registaInput?.id?.toString(), registaInput, this.httpOptions).pipe(
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
