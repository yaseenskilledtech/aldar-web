import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'verify-email',
  template: `
    <div class="container">
  <div class="col-md-12">
    <div class="logSkilled">
      <a routerLink="/home"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" xml:space="preserve">
      <image style="overflow:visible;"id="Layer_6_xA0_Image" xlink:href="../../../../assets/pages/logoo.svg"   >
	</image>
      </svg></a>
    </div>
  </div>



  <div class="row">
  <div class="col-sm-6 mx-auto">
    <div class="login  text-center float-none">
      <img src="assets/pages/mm.png" width="20%">
      <p class="text-center fw-bold fs-4 mt-4 mb-4 text-primary">قم بتأكيد بريدك الألكتروني</p>
      <h5 class="lh-base"> لقد قمنا بإرسال  رمز تحقق  إلى   {{ email }}
        <br>
        يرجى إدخال الرمز  للتحقق من بريدك الإلكتروني
      </h5>

    </div></div>


  </div>



</div>
  `,
  styleUrls: ['./action.component.scss']
})
export class VerifyEmailComponent {

  email: string

  constructor(private route: ActivatedRoute) {
    this.email = route.snapshot.queryParams['email']
   }

}
