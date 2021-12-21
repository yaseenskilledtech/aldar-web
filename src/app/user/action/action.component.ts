import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-action',
  template: `
   <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'resetPassword'">
        <reset-password></reset-password>
      </ng-container>

      <ng-container *ngSwitchCase="'verifyEmail'">   
        <verify-code></verify-code>
      </ng-container>

      <ng-container *ngSwitchCase="'sendVerifyEmail'">    
        <verify-email></verify-email>
      </ng-container>

      <ng-container *ngSwitchDefault>
        <p>no action found</p>
      </ng-container>

    </ng-container>
  `,
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {

  mode: string
  constructor(private route: ActivatedRoute) {
    this.mode = route.snapshot.queryParams['mode']
  }
}
