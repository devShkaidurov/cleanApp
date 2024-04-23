import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cleaner } from 'src/app/models/Cleaner';
import { CleanerService } from 'src/app/services/CleanerService';

@Component({
  selector: 'app-cleaner-profile',
  templateUrl: './cleaner-profile.component.html',
  styleUrls: ['./cleaner-profile.component.css']
})
export class CleanerProfileComponent {
  cleaner: Cleaner | undefined;
  id: number | undefined;

  constructor (
    private router: Router,
    private cleanerService: CleanerService
  ) {}

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("id"));
    if (!this.id) {
      console.dir("Не авторизован");
      // this.router.navigate(['auth']);
      // return;
    }

    this.cleanerService.getById(this.id).subscribe({
      next: (cleaner) => {
        this.cleaner = cleaner;
      },
      error: () => {
        console.dir("Произошла некоторая ошибка");
      }
    })
  }

  handleGoBack(): void {
    this.router.navigate(['cleaner', 'main']);
  }

  handleSignOff(): void {
    localStorage.removeItem("id");
    this.router.navigate(['auth']);
    return;
  }
  
  handleSave(): void {
    // id = in url
    // customer = in body
    // this.cleanerService.update(this.id, this.cleaner).subscribe({
    //   next: (customer) => {
    //     console.dir("Пользователь успешно сохранен");
    //   },
    //   error: () => {
    //     console.dir("Ошибка при редактировании данных пользователя");
    //   }
    // })
  }

}
