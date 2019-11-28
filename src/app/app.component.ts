import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Google Dashboard';

  constructor(private ngZone:NgZone, private router:Router) { }

  NavigateToHome = () => {
    this.ngZone.run(() => {
      this.router.navigate(['']);
    });
  }
}


