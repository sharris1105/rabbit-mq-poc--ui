import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { environment } from '../environments/environment';
import { rxStompConfig } from './../../rx-stomp.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RabbitMqListenerComponent } from './rabbit-mq-listener/rabbit-mq-listener.component';
import { AuthDataService } from './services/auth/auth-data-service';
import { AuthService } from './services/auth/auth.service';
import { EventListenerService } from './services/event-listener/event-listener.service';
import { JwtInterceptorService } from './services/jwt-interceptor/jwt-interceptor';
import { ServicesModule } from './services/services.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        WelcomeComponent,
        RabbitMqListenerComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ServicesModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    exports: [
        NavComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
        AuthService,
        AuthDataService,
        EventListenerService,
        AuthGuard,
        {
            provide: InjectableRxStompConfig,
            useValue: rxStompConfig
        },
        {
            provide: RxStompService,
            useFactory: rxStompServiceFactory,
            deps: [InjectableRxStompConfig]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
