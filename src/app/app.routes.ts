import { Routes } from '@angular/router';
import{ Customers } from './customers/customers'
import {Accounts} from './accounts/accounts'
import { NewCustomer } from './new-customer/new-customer';
import { Login } from './login/login';
import { AdminTemplate } from './admin-template/admin-template';
import { authenticationGuard } from './guards/authentication-guard';
import { authorizationGuard } from './guards/authorization-guard';
import { NotAuthorized } from './not-authorized/not-authorized';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component : Login}, 
  {
    path: "admin", component: AdminTemplate, canActivate : [authenticationGuard], 
    children: [
    {path : "customers", component : Customers },
   {path : "accounts", component : Accounts },
      { path: "new-customer", component: NewCustomer, canActivate: [authorizationGuard], data: { role: "ROLE_ADMIN" } },
      {path : "notAuthorized", component : NotAuthorized}, 
      {path : "search-account", component : Accounts}
    ]
  }, 
  
  ];
