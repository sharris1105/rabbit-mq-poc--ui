import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error/error.service';
import { VersionInfoModel } from '../models/version-info.model';
import { ExampleDataService } from '../services/example-data/example-data.service';

@Component({
  selector: 'app-api-examples',
  templateUrl: './api-examples.component.html',
  styleUrls: ['./api-examples.component.scss']
})

export class ApiExamplesComponent implements OnInit, OnDestroy {

  versionInfo: VersionInfoModel;
  constructor(
    private readonly exampleDataService: ExampleDataService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  onClick(): void {
    this.exampleDataService.getApiVersion()
      .then(
        result => { this.versionInfo = result; },
        err => { this.errorService.showError(err); }
      );
  }

  badApiCall(): void {
    this.exampleDataService.badApiCall()
      .then(
        result => { /* do something with data on success */ }
      );
  }

  handledBadApiCall(): void {
    this.exampleDataService.badApiCall()
      .then(
        result => { /* do something with data on success */ },
        err => { this.errorService.showError(err); }
      );
  }
}
