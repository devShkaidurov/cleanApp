import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CleanerMainComponent } from './components/cleaner-main/cleaner-main.component';
import { MainCustomerComponent } from './components/main-customer/main-customer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderComponent } from './components/order/order.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent, pathMatch: 'full'},
  { path: 'customer/main', component: MainCustomerComponent},
  { path: 'customer/profile', component: UserPanelComponent},
  { path: 'customer/order/:id', component: OrderComponent},
  { path: 'cleaner/order/:id', component: OrderComponent},
  { path: 'cleaner/main', component: CleanerMainComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
