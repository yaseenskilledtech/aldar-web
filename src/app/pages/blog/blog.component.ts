import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { BlogModel } from '../models/blog';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogs$!: Observable<BlogModel[]>;
  searchCtrl!: FormControl;
  subscribtions: Subscription = new Subscription();
  constructor(private blogService: BlogsService) {}

  ngOnInit(): void {
    this.searchCtrl = new FormControl('');

    this.subscribtions.add(
      this.searchCtrl.valueChanges
        .pipe(
          startWith(''),
          distinctUntilChanged(),
          debounceTime(1000),
          switchMap((val) => this.blogService.search('title', val.trim()))
        )
        .subscribe()
    );

    this.blogs$ = this.blogService.blogs$;
  }

  loadMore() {
    this.blogService.loadMore().subscribe();
  }
}
