import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  hide = true;
  hide1 = true;

  constructor(private fb: FormBuilder, private userService: UserService, private snackbar: MatSnackBar) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      confirm: [null, Validators.required]
    }, {validator: this.checkPasswords('password', 'confirm')});
  }

  ngOnInit() {
  }

  submit() {
    const user: User = new User(this.form.value.name, this.form.value.surname, this.form.value.username, this.form.value.password);
    this.userService.createUser(user).subscribe(success => {
      if (success) {
        this.openSnackbar('User has been registered');
      } else {
        this.openSnackbar('Invalid data');
      }
      console.log(success);
    });
  }

  checkPasswords(passwordKey: string, confirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[confirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({nonEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  private openSnackbar(message: string, ms?: number) {
    this.snackbar.open(message, 'X', {
      duration: ms || 3000,
      verticalPosition: 'top'
    });
  }
}
