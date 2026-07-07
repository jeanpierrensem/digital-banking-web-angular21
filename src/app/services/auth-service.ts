import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { APP_CONFIG} from '../config/app.config.token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false; 
  roles: any; 
  username: any 
  accessToken!: any ; 

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config : any) { }

  public login(username: string, password: string, ) { 
    let params = new HttpParams().set("username", username).set("password", password); 
    let options = {
      headers : new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }
    return this.http.post(this.config.backendHost+ "/auth/login", params, options)
  }

  public logout() { 
    this.isAuthenticated = false; 
    this.accessToken = undefined
    this.username = undefined
    this.roles = undefined
  }

  public loadProfile(data: any) { 
    this.isAuthenticated = true; 
    this.accessToken = data['access-token']

    let jwtDecoder : any = jwtDecode(this.accessToken)

    this.username = jwtDecoder.sub
    this.roles = jwtDecoder.authorities
    
    
  }

  hasRole(role: string): boolean {
  return this.roles?.includes(role) ?? false;
}

}
