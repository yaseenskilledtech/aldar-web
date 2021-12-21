import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Order } from 'src/app/profile/models/order';
import {
  DataType,
  FilterComponent,
  FilterModel,
  KeyModel,
} from 'src/app/share/components/filter/filter.component';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  orders$!: Observable<Order[]>;
  // orders$!: Observable<Order[]

  searchCtrl!: FormControl;
  subscribtions: Subscription = new Subscription();

  keys: KeyModel[] = [
    {
      key: 'gender',
      label: 'الجنس',
      valueType: DataType.String,
    },
    {
      key: 'emirate',
      label: 'الإمارة',
      valueType: DataType.String,
    },
    {
      key: 'nationality',
      label: 'الجنسية',
      valueType: DataType.String,
    },
    {
      key: 'education',
      label: 'التعليم',
      valueType: DataType.String,
    },
    {
      key: 'job',
      label: 'العمل',
      valueType: DataType.String,
    },
  ];

  filter: FilterModel[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private ordersService: OrderService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.searchCtrl = new FormControl('');

    this.subscribtions.add(
      this.searchCtrl.valueChanges
        .pipe(
          startWith(''),
          distinctUntilChanged(),
          debounceTime(1000),
          switchMap((val) =>
            this.ordersService.search('displayName', val.trim())
          )
        )
        .subscribe()
    );

    this.orders$ = this.ordersService.orders$.pipe(
      map((orders) => {
        return orders.map((o) => {
          if (o.birthdate?.seconds)
            o.birthdate = new Date(o.birthdate?.seconds).toLocaleDateString();
          return o;
        });
      })
    );
  }

  loadMore() {
    this.ordersService.loadMore().subscribe();
  }

  openDialog() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '1000px',
      disableClose: true,
      data: { keys: this.keys, filter: {} },
    });

    this.subscriptions.add(
      dialogRef
        .afterClosed()
        .pipe(
          switchMap((filter: FilterModel[]) => {
            this.filter = filter ?? [];
            return this.ordersService.filter(this.filter);
          })
        )
        .subscribe(
          () => {},
          (error: any) => {
            this.filter = [];
          }
        )
    );
  }

  deleteFilterField(index: number) {
    this.filter.splice(index, 1);
    this.subscriptions.add(
      this.ordersService.filter(this.filter).subscribe(
        () => {},
        () => {
          this.filter = [];
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
