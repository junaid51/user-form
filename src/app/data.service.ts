import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userUrl = 'https://tekdi-challenges.appspot.com/api';

  constructor(private http: HttpClient) { }

  users$ = this.http.get<User[]>(`${this.userUrl}/People`)
  .pipe(tap(data => console.log(JSON.stringify(data))),
  catchError(this.handleError)
  );

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/People/${id}`);
  }

  addUser(body: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/People`, body);
  }

  editUser(id: string, body: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/People/${id}`, body);
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
