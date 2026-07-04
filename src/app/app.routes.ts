import { Routes } from '@angular/router';
import{ Customers } from './customers/customers'
import {Accounts} from './accounts/accounts'

export const routes: Routes = [
  {path:'',redirectTo: 'Accueil', pathMatch: 'full' },
  {path : "customers", component : Customers },
  {path : "accounts", component : Accounts },

  ];
