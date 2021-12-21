import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <section id="breadc">
      <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a routerLink="/">الرئيسية</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{currentPage}}</li>
          </ol>
        </nav>
      </div>
    </section>
  `,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {

  @Input() currentPage!: string;

}
