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

  constructor (
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const id = Number(localStorage.getItem("id"));
    if (!id) {
      console.dir("Не авторизован");
      // this.router.navigate(['auth']);
      // return;
    }

    this.customerService.get(id).subscribe({
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


}
