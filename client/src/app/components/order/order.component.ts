import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/OrderService';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Order
  objectType = environment.objectType;
  orderStatus = environment.orderStatus;
  cleanType = environment.cleanType;
  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
      const userId = Number(localStorage.getItem("id"));
      const orderId = Number(this.route.snapshot.paramMap.get('id')); 
      if (!orderId) {
        console.dir("Не могу найти идентификатор заказа");
        this.router.navigate(['customer', 'main']);
        return;
      } 
      this.orderService.getOrderById(userId, orderId).subscribe({
        next: (order) => {
          this.order = order;
        },
        error: () => {
          console.dir("Ошибка при получении заказа по идентификатору");
          this.router.navigate(['customer', 'main']);
          return;
        }
      })
  }

  getStatus(status: number): string {
    return this.orderStatus.find(item => item.key === status)?.value;
  }

  getCleanType(type: number): string {
    return this.cleanType.find(item => item.key === type)?.value;
  }

  getObjectType(type: number): string {
    return this.objectType.find(item => item.key === type)?.value;
  }

  uploadPhotos(): void {
    const input = document.getElementById("imageLoader") as HTMLInputElement;
    const preview = document.querySelector(".preview");
      while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
      }
      let curFiles = input.files;
      const list = document.createElement("ol");
      list.style.display = "flex";
      list.style.width = "100%";
      list.style.alignItems = "center";
      list.style.justifyContent = "space-evenly";
      list.style.border = "solid 1px red;";
      list.style.flexDirection = "row";
      list.style.margin = "0px";
      list.style.padding = "0px";
      preview.appendChild(list);
  
      const count = curFiles.length > 3 ? 3 : curFiles.length;

      for (let i = 0; i < count; i++) {
        const file = curFiles[i];
        const listItem = document.createElement("li");
        listItem.style.listStyleType = "none";
        listItem.style.marginRight = "5px";
        
        if (this.validFileType(file)) {
          const image = document.createElement("img");
          image.style.height = "64px";
          image.src = URL.createObjectURL(file);
          image.alt = image.title = file.name;
          listItem.appendChild(image);
        } 
        list.appendChild(listItem);
      }
    }

    fileTypes = [
      "image/apng",
      "image/bmp",
      "image/gif",
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/svg+xml",
      "image/tiff",
      "image/webp",
      "image/x-icon",
    ];
    
    validFileType (file: any) {
      return this.fileTypes.includes(file.type);
    }
    
    returnFileSize (number: number): string {
      if (number < 1024) {
        return `${number} bytes`;
      } else if (number >= 1024 && number < 1048576) {
        return `${(number / 1024).toFixed(1)} KB`;
      } else if (number >= 1048576) {
        return `${(number / 1048576).toFixed(1)} MB`;
      }
      return ""
    }
  
}
