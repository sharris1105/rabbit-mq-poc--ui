import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  errorDescription = 'The page requested cannot be found.';
  errorCode = 404;
  errorMessage = 'Page Not Found';
  constructor() { }

  ngOnInit(): void {
  }
}
