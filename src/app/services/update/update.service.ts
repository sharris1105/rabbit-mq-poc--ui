import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private readonly updates: SwUpdate,
    private readonly snackBar: MatSnackBar
  ) { }

  register(): void {
    this.updates.available.subscribe(() => {
      this.snackBar.open('A new version of the app is available!', 'Refresh')
        .afterDismissed()
        .subscribe(() => {
          this.updates.activateUpdate()
            .then(() => document.location.reload());
        });
    });
  }
}
