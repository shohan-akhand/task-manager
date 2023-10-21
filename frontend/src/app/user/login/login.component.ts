import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from 'src/app/services/data-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  setEmail: any;
  setPassword: any;

  constructor(
    private http: HttpClient,
    private dataService: DataServiceService
  ) {
    // Constructor code
  }

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  ngOnInit(): void {
    this.dataService.email$.subscribe((email) => {
      this.setEmail = email;
      console.log(this.setEmail);
    });
    this.dataService.password$.subscribe((password) => {
      this.setPassword = password;
    });
  }

  onSubmit() {
    this.setEmail = this.email.value;
    this.setPassword = this.password.value;
    // Send a POST request to your API
    this.http
      .post('http://localhost:3000/users/login', this.loginForm)
      .subscribe(
        (response) => {
          // Handle successful login response, e.g., store tokens and navigate to another page
          console.log('Login successful:', response);
        },
        (error) => {
          // Handle login errors, e.g., display an error message
          console.error('Login failed:', error);
        }
      );
  }
}
