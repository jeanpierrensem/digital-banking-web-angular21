import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { APP_CONFIG } from '../config/app.config.token';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: any)  { }

  public getCustomer(): Observable<Array<Customer>> { 
    return this.http.get<Array<Customer>>(this.config.bankendHost+"/customers"); 
  }
  public searchCustomers(keyword: String): Observable<Array<Customer>> { 
     console.log("URL" + this.config.bankendHost+"/customers/search?keyword="+keyword)
    return this.http.get<Array<Customer>>(this.config.bankendHost+"/customers/search?keyword="+keyword); 
  }
}
