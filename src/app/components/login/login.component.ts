import { Component } from '@angular/core';
import { AuthGoogleService } from '../../services/googleauth/auth-google.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authGoogleService: AuthGoogleService) { }

  login() {
    this.authGoogleService.login();
  }
  onClick()
  {
    window.open("https://accounts.google.com/lifecycle/steps/signup/name?continue=https://mail.google.com/mail/e-11-11e0ed6018d40b96f57b5a3eacb87-433e6436415726331f431673029f6f00b0b5341f&ddm=0&dsh=S-888455091:1717359467265594&flowEntry=SignUp&flowName=GlifWebSignIn&service=mail&TL=AC3PFD4ZFgpk5MkPvUgQzzdEk06iK2O_ncRmNLtrBO4mihdSIFdoZiw7Fxc-wcfs");
  
  }
}
