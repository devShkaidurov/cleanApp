import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cleaner } from 'src/app/models/Cleaner';
import { AdminService } from 'src/app/services/AdminService';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
})
export class EmployeeCardComponent implements OnInit {
  isNew = true;
  cleaner: Cleaner;

  constructor (
    private route: ActivatedRoute,
    private adminService: AdminService,
    private datePipe: DatePipe,
    private router: Router
  ) {}


  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param === "new") {
      this.isNew = true;
      this.cleaner = {
        fio: "",
        login: "",
        password: "",
        birthday: 0
      } as Cleaner;
    } else {
      this.isNew = false;
      const cleanerId = Number(param); 
      this.adminService.getCleaner(cleanerId).subscribe({
        next: (cleaner) => {
          console.dir(cleaner);
          this.cleaner = cleaner;
        },
        error: () => {
          console.error("Ошибка при извлечении данных у сотрудника №" + cleanerId);
        }
      });
    }
  }

  handleAddEmployee(): void {
    this.adminService.addCleaner(this.cleaner).subscribe({
      next: (cleaner) => {
        console.dir("Сотрудник успешно добавлен!");
        this.router.navigate(['admin', 'employee', cleaner.id]);
      },
      error: () => {
        console.error("Ошибка при добавлении сотрудника!");
      }
    })
  }

  handleGoBack(): void {
    this.router.navigate(['admin', 'main']);
  }

}

