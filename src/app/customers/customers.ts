import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService   } from '../services/customer-service';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {

  customers$!: Observable<Array<Customer>>;
  errorMessage!: String 
  loading = true; 
  searchFormGroup : FormGroup | undefined; 

  constructor(private customerService: CustomerService, private fb : FormBuilder) { }
  
  ngOnInit(): void {
    //form initialisation
    this.searchFormGroup = this.fb.group({
        keyword: this.fb.control("")
    }) 

    this.customers$ = this.customerService.getCustomer().pipe(
        finalize(() => {
        // ✔ exécuté dans TOUS les cas (success + error)
        this.loading = false;
      }),
      
      catchError(err => {
        //x - traitement des erreur : customers est de type Observable, en cas d'erreur lors de l'appel 
        //de l'API, on la traite, pipe c'est pour écouter sur le retour du subscribe avec async au niveau 
        //du composant HTML
        this.errorMessage = err.message; 
        this.loading = false; 
        return throwError( () =>err)
      })
    ); 
  }
  
  handleSearhCustomer() { 
    let kw = this.searchFormGroup?.value.keyword
    console.log(this.searchFormGroup)
     this.customers$ = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message; 
        this.loading = false; 
        return throwError( () =>err)
      })
    ); 
  }

  }