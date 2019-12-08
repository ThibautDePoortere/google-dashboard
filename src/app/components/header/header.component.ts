import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ngZone:NgZone, private router:Router) { }

  ngOnInit() {
  }

  GoToHomepage() {
    this.ngZone.run(() => {
      this.router.navigate(['']);
    });
  }

}
