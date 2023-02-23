import { AuthenticationResult } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'add-test';
  isOpen: boolean = true;
  variant: any = 'support'
  username: any = 'Hola :)';
  constructor(private msalService: MsalService){}

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if(res !== null && res.account !== null){
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
  }

  isLoggedIn() : boolean {
    return this.msalService.instance.getActiveAccount() !== null
  }

  login(){
    //this.msalService.loginRedirect();
    this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
      this.msalService.instance.setActiveAccount(response.account)
      console.log(response.account)
      this.username = `Bienvenido ${response.account?.name}`
      this.variant = 'exclusive';
    });
  }
  logout(){
    this.msalService.logout();
  }
}
