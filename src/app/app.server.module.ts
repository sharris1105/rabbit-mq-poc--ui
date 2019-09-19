import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

const routes: Routes = [{ path: 'shell', component: AppShellComponent }];

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent]
})
export class AppServerModule {
  // * We need to do this so the app shell plays nice with the 404 route
  // * see https://github.com/angular/angular-cli/issues/8929#issuecomment-361884581 for more info
  constructor(private router: Router) {
    this.router.resetConfig(routes);
  }
}
