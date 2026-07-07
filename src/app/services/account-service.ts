import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/app.config.token';
import { Observable } from 'rxjs';
import { AccounDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root',
})
  
export class AccountService {
  constructor(private http : HttpClient, @Inject(APP_CONFIG) private config : any) { }

  public getAccount(accountId: number, page: number, size: number) : Observable<AccounDetails> {
    return this.http.get<AccounDetails>(this.config.backendHost + "/accounts/" + accountId + "/pageOperations?page=" + page + "&size=" + size); 
    
  }

  public debit(accountId: String, amount: number, description: String) {
    console.log({ accountId, amount, description })
    return this.http.post(this.config.backendHost + "/accounts/debit", { accountId, amount, description }); 
  }
    public credit(accountId: String, amount: number, description: String) {
    console.log({ accountId, amount, description })
    return this.http.post(this.config.backendHost + "/accounts/credit", { accountId, amount, description }); 
    }
  public transfer(accountSource: String, accountDestination: String, amount: number) {
      console.log("data", { accountSource, accountDestination,  amount } )
    return this.http.post(this.config.backendHost + "/accounts/transfer", { accountSource, accountDestination,  amount }); 
  }


}
