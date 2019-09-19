import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  generateCommand = 'ng generate component #your-component-name-here# -m home.module';

  constructor() { }

  ngOnInit(): void {
    const breakpointMessage = 'test';
  }
}
