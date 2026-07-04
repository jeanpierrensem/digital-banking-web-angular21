import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService   } from '../services/customer-service';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {

  customers: any;
  errorMessage: String|undefined 

  constructor(private customerService: CustomerService) { }
  
  ngOnInit():void {
    this.customerService.getCustomer().subscribe({
      next : (data:any)=>{
        this.customers =data
        },
      error : (err:any)=>{
        console.log("err")
        }
      });
    }
  }