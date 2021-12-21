import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ConnectFormDirective } from './directives/connect-form.directive';
import { LoadingService } from './services/loading.service';
import { UploadService } from './services/upload.service';
import { FilterComponent } from './components/filter/filter.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    BreadcrumbComponent,
    ConnectFormDirective,
    FilterComponent,
  ],
  exports: [
    NavComponent,
    FooterComponent,
    BreadcrumbComponent,
    ConnectFormDirective,
    FilterComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule,ReactiveFormsModule],
  providers: [LoadingService, UploadService],
})
export class ShareModule {}
