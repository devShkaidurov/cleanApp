import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { EmployeeCardComponent } from './components/admin/employee-card/employee-card.component';
import { AuthComponent } from './components/auth/auth.component';
import { CleanerMainComponent } from './components/cleaner-main/cleaner-main.component';
import { CleanerProfileComponent } from './components/cleaner-profile/cleaner-profile.component';
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
  { path: 'admin/order/:id', component: OrderComponent},
  { path: 'cleaner/profile', component: CleanerProfileComponent},
  { path: 'cleaner/main', component: CleanerMainComponent},
  { path: 'admin/main', component: AdminPanelComponent},
  { path: 'admin/employee/:id', component: EmployeeCardComponent},
  { path: 'admin/employee/:userId/order/:id', component: OrderComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
