import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainCustomerComponent } from './components/main-customer/main-customer.component';
import { HistoryOrderComponent } from './components/history-order/history-order.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { ActiveOrderCustomerComponent } from './components/active-order-customer/active-order-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
