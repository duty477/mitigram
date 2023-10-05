import {Component, OnInit} from '@angular/core';
import {Notification} from "../../models/notification.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {SwiperOptions} from "swiper";
import {LoaderComponent} from "../../partials/loader/loader.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  notifications: Notification[] = [];
  contractors: User[] = [];
  name = 'John';
  swiperConfig: SwiperOptions = {
    slidesPerView: 'auto',
    spaceBetween: 50,
    freeMode: true,
    grabCursor: true
  };

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.userService.contractors.subscribe((users: User[]) => {
      this.contractors = users;
      LoaderComponent.toggleDisplay(false);
    });
    this.notificationService.notifications.subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }
}
