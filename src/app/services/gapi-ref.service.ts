import { Injectable } from '@angular/core';

declare let gapi:any;

@Injectable({
  providedIn: 'root'
})
export class GapiRefService {
  logIsEnabled=false;
  gapi = gapi;
  apiKey:any = 'AIzaSyAqB8wLhNLShHlVyGhrPO5L8W7O8N1qLoc';
  clientId:any = '83248708989-50ju6ifsplj50lku152i3svp3j6069nv.apps.googleusercontent.com';
  discoveryDocs:any = ["https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest", "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]; // Hier kan je 2 discoveryDocs meegeven, geschieden door een komma
  scopes:any = "https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/calendar"; // Hier kan je 2 scopes meegeven, gescheiden door een spatie

  constructor() { }
}
