import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from 'src/app/profile/models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {
  isLogin$!: Observable<boolean>;

  orders$!: Observable<Order[]>;
  constructor(private ordersService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.ordersService.orders$.pipe(
      map((orders) => {
        const data = orders;
        return data.map((o) => {
          if (o.birthdate?.seconds)
            o.birthdate = new Date(o.birthdate?.seconds).toLocaleDateString();
          return o;
        });
      })
    );
  }
}
