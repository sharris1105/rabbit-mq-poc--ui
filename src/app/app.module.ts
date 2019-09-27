import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessageComponent } from './rabbit-mq-listener/message/message.component';
import { RabbitMqListenerComponent } from './rabbit-mq-listener/rabbit-mq-listener.component';
import { AuthDataService } from './services/auth/auth-data-service';
import { AuthService } from './services/auth/auth.service';
import { EventListenerService } from './services/event-listener/event-listener.service';
import { JwtInterceptorService } from './services/jwt-interceptor/jwt-interceptor';
import { ServicesModule } from './services/services.module';
import { StompEventListenerService } from './services/stomp-event-listener/stomp-event-listener.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        WelcomeComponent,
        RabbitMqListenerComponent,
        PageNotFoundComponent,
        MessageComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ServicesModule,
        MatButtonModule,
        MatIconModule,
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
        StompEventListenerService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
