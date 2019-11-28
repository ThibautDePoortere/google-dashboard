import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-to-home',
  templateUrl: './go-to-home.component.html',
  styleUrls: ['./go-to-home.component.css']
})
export class GoToHomeComponent implements OnInit {

  constructor(private ngZone:NgZone, private router:Router) { }

  ngOnInit() {
  }

  NavigateToHome = () => {
    this.ngZone.run(() => {
      this.router.navigate(['']);
    });
  }

}
