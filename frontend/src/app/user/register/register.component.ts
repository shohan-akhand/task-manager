import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name= new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email= new FormControl('',[
    Validators.required,
    Validators.email
  ])
  password= new FormControl('',[
    Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')
  ])
  confirm_password= new FormControl('',[
    Validators.required
  ])
  
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    confirm_password: this.confirm_password
    
  })

}
