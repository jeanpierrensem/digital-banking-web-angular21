import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, Observable } from 'rxjs';
import { AccounDetails } from '../model/account.model';
import { AccountService } from '../services/account-service';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-accounts',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts implements OnInit {
  accountFormGroup!: FormGroup
  accountObservable!: Observable<AccounDetails>
  currentPage: number = 0
  size: number = 5
  errorMessage!: string
  pages: number[] = [];
  operationFormGroup!: FormGroup

  
  constructor(private fb: FormBuilder, private accountService: AccountService, public authService : AuthService) { }

  ngOnInit(): void {

    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control(null)
    })
    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)
    })

  }



  getPages(totalPages: number | undefined): number[] {
    if (!totalPages) return [];
    return Array.from({ length: totalPages }, (_, i) => i);
  }
  
  gotoPage(page: number) {
    this.currentPage = page;
    this.handleAccountSearch()
  }

  handleAccountSearch() {
    let accountId = this.accountFormGroup.value.accountId
    console.log("account id =" + accountId)
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.size)
  }

  handleOperation() {
    let accountId : String = this.accountFormGroup.value.accountId
    let operationType = this.operationFormGroup.value.operationType
    let amount : number = this.operationFormGroup.value.amount
    let description: String = this.operationFormGroup.value.description
    let accountDestination : String = this.operationFormGroup.value.accountDestination
    

    if (operationType == 'DEBIT') {
      this.accountService.debit(accountId, amount, description).subscribe({
      next: (data) => { 
        alert("Debit operation saved successfully")
      },
      error: (err) => {
        console.log(err)
      }
      }); 
    } else if (operationType == 'CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
      next: (data) => { 
          alert("Credit operation saved successfully")
           this.handleAccountSearch()
      },
      error: (err) => {
        console.log(err)
      }
      }); 

    } else if (operationType == 'TRANSFER') {
      this.accountService.transfer(accountId, accountDestination,  amount).subscribe({
      next: (data) => { 
          alert("Transfer operation saved successfully")
          this.handleAccountSearch()
      },
      error: (err) => {
        console.log(err)
      }
      }); 
    }
  }
}


