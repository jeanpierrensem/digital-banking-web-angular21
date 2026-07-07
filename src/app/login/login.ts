import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login  implements OnInit{
  loginFormGroup!: FormGroup
  username!: String; 
  password! : String
  
  constructor(private fb : FormBuilder, private authService : AuthService, private router : Router) { }
  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
    username : this.fb.control(''),
    password : this.fb.control("")
    })
    
  }

  handleLogin() {
    let username = this.loginFormGroup.value.username; 
    let pwd = this.loginFormGroup.value.password
    this.authService.login(username, pwd).subscribe({
      next: (data) => { 
        this.authService.loadProfile(data), 
          this.router.navigateByUrl("/admin")

      }, 
      error: (err) => { 
        console.log(err)
      }
    })
    
   }



}
