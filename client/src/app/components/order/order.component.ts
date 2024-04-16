import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { startWith } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Order } from 'src/app/models/Order';
import { Photo } from 'src/app/models/Photo';
import { Review } from 'src/app/models/Review';
import { OrderService } from 'src/app/services/OrderService';
import { PhotoService } from 'src/app/services/PhotoService';
import { ReviewService } from 'src/app/services/ReviewService';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order: Order;
  review: Review;
  photos: Photo[];
  objectType = environment.objectType;
  orderStatus = environment.orderStatus;
  cleanType = environment.cleanType;
  reviewValue: number = 0;

  formReview = new FormGroup({
    
  })
  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private reviewService: ReviewService,
    private photoService: PhotoService
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

      this.reviewService.getReviewById(orderId).subscribe({
        next: (review) =>{
          this.review = review;
          this.photoService.getPhotoById(this.review.id).subscribe({
            next: (photos) => {
              this.photos = photos;
            },
            error: () => {
              console.dir("Ошибка получения фотографий отзыва!");
            }
          })
        },
        error: () => {
          console.dir("Ошибка получения отзыва!");
        }
      })

      

      // bind start hover and click 
      const stars = document.getElementById("review-values").childNodes;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.addEventListener('mouseover', (e) => {
          this.setFilled(i, stars, false);
        }); 
        star.addEventListener('mouseout', (e) => {
          this.unsetFilled(i, stars);
        }); 
        star.addEventListener('click', (e) => {
          this.setFilled(i, stars, true);
        }); 
      }
      console.dir(stars);

  }

  setFilled(index: number, stars: any, isClick: boolean) {
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      if (i <= index) {
        const currentImg = star.firstChild as HTMLElement;
        currentImg.style.content = 'url("../../../assets/images/filledStar.svg")';
      } else {
        const currentImg = star.firstChild as HTMLElement;
        currentImg.style.content = 'url("../../../assets/images/star.svg")';
      }
    }

    if (isClick) {
      this.reviewValue = index * 5 / (stars.length - 1);
    }
  }

  unsetFilled (index: number, stars: any) {
    if (index + 1 >= stars.length)
      return;
    const star = stars[index + 1].firstChild as HTMLElement;
    star.style.content = 'url("../../../assets/images/star.svg")';
  }

  hoverFunction (e: any) {
    console.dir(e);
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
  

    handleReview(): void {
      const input = document.getElementById("imageLoader") as HTMLInputElement;
      const curFiles = input.files;
      const text = (document.getElementById("reviewText") as HTMLInputElement).value;
      this.reviewService.sendReview(this.order.id, curFiles, text, this.reviewValue).subscribe({
        next: (order) => {
          console.dir(order);
        },
        error: () => {
          console.dir("Ошибка при отправке отзыва!")
        }
      })
    }

    handleGoMain(): void {
      this.router.navigate(['customer', 'main']);
    }

}
