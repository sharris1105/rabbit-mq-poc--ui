import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { FileDownloadService } from '../file-download/file-download.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  encapsulation: ViewEncapsulation.None // * unfortunately need this to style the snackbar container
})
export class ErrorComponent {
  message: string;
  error: Error;

  constructor(
    private readonly downloadService: FileDownloadService,
    private readonly snackBarRef: MatSnackBarRef<ErrorComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.message = data.message;
    this.error = data.error;
  }

  download(): void {
    this.downloadService.downloadErrorLog(this.error);
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
