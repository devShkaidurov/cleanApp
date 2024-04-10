import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/UserRegister';
import { CleanerService } from 'src/app/services/CleanerService';
import { CustomerService } from 'src/app/services/CustomerService';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isCleaner = false;
  isRegister = false;
  userForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  constructor (
    private customerService: CustomerService,
    private cleanerService: CleanerService,
    private router: Router
  ) { }

  onChange(): void {
    this.isCleaner = !this.isCleaner;
  }

  handleChangeAction(): void {
    this.isRegister = !this.isRegister;
  }

  handleProcceedAuth(): void {
    const user = this.userForm.value as UserRegister;
    if (this.isCleaner) {
      if (this.isRegister) {
        this.cleanerService.register(user).subscribe({
          next: () => {
            console.dir("Регистрация прошла успешна! Теперь Вы можете войти!");
            this.isRegister = false;
          },
          error: (err) => {
            console.dir("Ошибка при регистрации!");
          }
        })
      } else {
        this.cleanerService.auth(user).subscribe({
          next: (user) => {
            console.dir(user);
            if (!user)
              return;
            localStorage.setItem("id", user.id.toString());
            this.router.navigate(['cleaner', 'main']);
          },
          error: () => {
            console.dir("Ошибка при авторизации!");
          }
        })
      }
    } else {
      if (this.isRegister) {
        this.customerService.register(user).subscribe({
          next: () => {
            console.dir("Регистрация прошла успешна! Теперь Вы можете войти!");
            this.isRegister = false;
          },
          error: (err) => {
            console.dir("Ошибка при регистрации!");
          }
        })
      } else {
        this.customerService.auth(user).subscribe({
          next: (user) => {
            console.dir(user);
            if (!user)
              return;
            localStorage.setItem("id", user.id.toString());
            this.router.navigate(['customer', 'main']);
          },
          error: () => {
            console.dir("Ошибка при авторизации!");
          }
        })
      }
    }
  }
}
