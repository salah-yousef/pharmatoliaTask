import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';
  constructor(private http: HttpClient) { }


  getMakes()  {
    return this.http.get(this.url).pipe(
      tap(data => {
        //console.log(`All: ${JSON.stringify(data)}`)
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else{
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
