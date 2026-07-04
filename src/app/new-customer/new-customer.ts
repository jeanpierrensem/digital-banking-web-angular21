import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer-service';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css',
})

  
export class NewCustomer implements OnInit{
  newCustomerFormGroup!: FormGroup


  constructor(private customerService : CustomerService, private fb : FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control(null, {
        validators: [Validators.required, Validators.minLength(4)]
      }), 
    email: this.fb.control(null, {
      validators: [Validators.required, Validators.email]
    })
    }); 
  } 

  handleSaveCustomer() { 
    let customer : Customer = this.newCustomerFormGroup.value; 
    this.customerService.saveCustomer(customer).subscribe({
      next: (data) => {
        alert("customer has been successfuly saved")
        //this.newCustomerFormGroup.reset()
        this.router.navigateByUrl("/customers")
      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }

}

