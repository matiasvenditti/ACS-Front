import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      confirm: [null, Validators.required]
    }, {validator: this.checkPasswords('password', 'confirm')})
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.form.value);
  }

  checkPasswords(passwordKey: string, confirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey]
      let passwordConfirmationInput = group.controls[confirmationKey]
      if (passwordInput.value !== passwordConfirmationInput.value){
        return passwordConfirmationInput.setErrors({nonEquivalent: true})
      } else {
        return passwordConfirmationInput.setErrors(null)
      }
    }
  }

}
