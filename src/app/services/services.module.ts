import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [ErrorComponent],
  entryComponents: [ErrorComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule
  ]
})
export class ServicesModule { }
