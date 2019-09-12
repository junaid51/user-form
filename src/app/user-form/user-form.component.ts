import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  id = '';
  errorMessage: '';

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private data: DataService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      avatar: [''],
      country: [''],
    });
    this.id = this.route.snapshot.params['id'];

    if (this.id !== 'new') {
      this.data.getUser(this.id).subscribe(
        (response: User) => {
          const {name, email, dob, avatar, country} = response;
          this.userForm.setValue({ name, email, dob, avatar, country });

        }, error => this.errorMessage = error
      )
    }
  }

  save(): void {
    if(this.userForm.valid) {
      console.log(this.userForm);
      const user: User = {...this.userForm.value};

      this.id === 'new' ?
        this.data.addUser(user).subscribe(res => this.router.navigate(['user-list']), err => this.errorMessage = err) :
        this.data.editUser(this.id, user).subscribe(res => console.log(res), err => console.log(err));

      this.router.navigate(['user-list']);
    }
  }

}
