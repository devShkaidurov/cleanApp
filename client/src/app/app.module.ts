import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import localeRu from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { OrderComponent } from './components/order/order.component';
import { CleanerMainComponent } from './components/cleaner-main/cleaner-main.component';
import { ActiveOrderCleanerComponent } from './components/active-order-cleaner/active-order-cleaner.component';
import { CleanerProfileComponent } from './components/cleaner-profile/cleaner-profile.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NotFoundComponent,
    UserPanelComponent,
    OrderComponent,
    CleanerProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
