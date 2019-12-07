import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GapiRefService } from './gapi-ref.service';

@Injectable({
  providedIn: 'root'
})
export class GapiAuthenticateService {
  isSignedInSubject:BehaviorSubject<any> = new BehaviorSubject<any>(false);
  isSignedInObservable = this.isSignedInSubject.asObservable();

  constructor(private gapiRef:GapiRefService) {
    this.loadClient();
  }

  loadClient = () => {
    this.gapiRef.gapi.load('client:auth2', this.initClient);
  }

  initClient = () => {
    this.gapiRef.gapi.client.init({
      apiKey: this.gapiRef.apiKey,
      clientId: this.gapiRef.clientId,
      discoveryDocs: this.gapiRef.discoveryDocs,
      scope: this.gapiRef.scopes
    }).then(() => {
      this.gapiRef.gapi.auth2.getAuthInstance().isSignedIn.listen(this.publishSignInStatus);
      this.publishSignInStatus(this.gapiRef.gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function(error) {
      console.log(error);
    })
  }



  // =======================================================
  // === Authenticate ======================================
  // =======================================================
  authenticate = () => {
    this.gapiRef.gapi.auth2.getAuthInstance().signIn();
  }

  logOut = () => {
    this.gapiRef.gapi.auth2.getAuthInstance().signOut();
  }

  publishSignInStatus = (isSignedIn:boolean) => {
    this.isSignedInSubject.next(isSignedIn);
  }
  // =======================================================
}
