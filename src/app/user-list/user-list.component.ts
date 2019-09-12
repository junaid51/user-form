import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../user';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  title = 'User List';
  errorMessage = '';

  constructor(private data: DataService) {}

  users$: Observable<User[]> = this.data.users$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  ngOnInit(): void {
  }

}
