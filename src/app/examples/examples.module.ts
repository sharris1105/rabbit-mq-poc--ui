import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatIconModule, MatRadioModule, MatSlideToggleModule } from '@angular/material';

import { ApiExamplesComponent } from './api-examples/api-examples.component';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';
import { UiExamplesComponent } from './ui-examples/ui-examples.component';
import { StateManagementExamplesComponent } from './state-management-examples/state-management-examples.component';

@NgModule({
  declarations: [UiExamplesComponent, ApiExamplesComponent, ExamplesComponent, StateManagementExamplesComponent],
  imports: [
    CommonModule,
    ExamplesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule
  ]
})
export class ExamplesModule { }
