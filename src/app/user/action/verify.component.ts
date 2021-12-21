import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'verify-code',
  template: `
    <p class="text-center">
      verifing ...
    </p>
  `,
  styles: [
  ]
})
export class VerifyComponent implements OnInit {

  code: string

  constructor(private route: ActivatedRoute, private  userService: UserService) {
    this.code = route.snapshot.queryParams['oobCode']
   }

  ngOnInit(): void {
    this.userService.verificationCode(this.code)
  }

}
