import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RabbitMqListenerComponent } from './rabbit-mq-listener/rabbit-mq-listener.component';

export const routes: Routes = [
    //{ path: '', component: WelcomeComponent },
    { path: '', redirectTo: 'save-as-you-go', pathMatch: 'full' },
    {
        path: 'examples',
        loadChildren: './examples/examples.module#ExamplesModule'
    },
    { path: 'save-as-you-go', component: RabbitMqListenerComponent },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
