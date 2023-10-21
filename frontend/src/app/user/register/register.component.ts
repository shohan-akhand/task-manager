import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}'
    ),
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
  });
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    // Form setup
  }
  onClick() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Make an HTTP POST request to your API to register the user
      this.http
        .post('http://localhost:3000/users/create-account', formData)
        .subscribe(
          (response) => {
            console.log('Registration successful:', response);
            // Handle success, e.g., show a success message and redirect
          },
          (error) => {
            console.error('Registration failed:', error);
            // Handle errors, e.g., display an error message
          }
        );
    }
  }
}
