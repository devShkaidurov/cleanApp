import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/CustomerService';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  customer: Customer | undefined;
  id: number | undefined;

  constructor (
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("id"));
    if (!this.id) {
      console.dir("Не авторизован");
      // this.router.navigate(['auth']);
      // return;
    }

    this.customerService.get(this.id).subscribe({
      next: (customer) => {
        this.customer = customer;
      },
      error: () => {
        console.dir("Произошла некоторая ошибка");
      }
    })
  }

  handleGoBack(): void {
    this.router.navigate(['customer', 'main']);
  }

  handleSignOff(): void {
    localStorage.removeItem("id");
    this.router.navigate(['auth']);
    return;
  }
  
  handleSave(): void {
    // id = in url
    // customer = in body
    this.customerService.update(this.id, this.customer).subscribe({
      next: (customer) => {
        console.dir("Пользователь успешно сохранен");
      },
      error: () => {
        console.dir("Ошибка при редактировании данных пользователя");
      }
    })
  }

}
