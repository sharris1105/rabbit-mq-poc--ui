import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ErrorComponent } from './error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private readonly snackBar: MatSnackBar) { }

  // tslint:disable-next-line:no-inferrable-types
  showError(e: Error, messageToShow: string = 'A system error occurred.'): void {
    this.snackBar.openFromComponent(
      ErrorComponent, {
        data: {
          message: messageToShow,
          error: e
        },
        panelClass: 'error',
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      }
    );
  }
}
