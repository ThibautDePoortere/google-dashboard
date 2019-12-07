import { Component, OnInit, NgZone } from '@angular/core';
import { GapiRefService } from 'src/app/services/gapi-ref.service';
import { GapiAuthenticateService } from 'src/app/services/gapi-authenticate.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isSignedIn:boolean;

  constructor(private gapiRef:GapiRefService, private gapiAuthService:GapiAuthenticateService, private ngZone:NgZone) { }

  ngOnInit() {
    this.gapiAuthService.isSignedInObservable.subscribe((status) => {
      this.ngZone.run(() => {
        this.aanpassenIsSignedInStatus(status);
      });
    });
  }

  aanpassenIsSignedInStatus = (status) => {
    this.isSignedIn = status;
  }

  logIn = () => {
    this.gapiAuthService.authenticate();
  }

  logUit = () => {
    this.gapiAuthService.logOut();
  }

}
