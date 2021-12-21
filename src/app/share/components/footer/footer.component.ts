import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-12 col-md-3 col-lg-3">

            <svg width="50%" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 158 129" xml:space="preserve">
              <image style="overflow:visible;" width="129" height="129" xlink:href="../../../../assets/pages/footerlogo.svg"  transform="matrix(1 0 0 1 -0.17918 -0.05738)">
              </image>
          </svg>
            <p class="fs-6">
              السعي وراء تسهيل ايجاد شريك الحياة الزوجية المثالي بطريقه عصريه مبتكره مع تاكيد الالتزام والمحافظه على الهوية العربيه والعادات الاسلاميه
            </p>

            <ul class="social text-center float-end p-0">
              <li><a href="#" class="text-primary"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="#" class="text-primary"><i class="fab fa-instagram-square"></i></a></li>
              <li><a href="#" class="text-primary"><i class="fab fa-twitter"></i></a></li>
              <li><a href="#" class="text-primary"><i class="fab fa-linkedin-in"></i></a></li>
            </ul>
          </div>




          <div class="col-sm-6 col-12 col-md-3 col-lg-3">
            <div class="col1 fw-bold mt-4">
              <p> إتصل بنا</p>
              <ul>
                <li><i class="fas fa-map-marker-alt"></i><a href="#">الإمارات العربية المتحدة - عجمان</a></li>
                <li><i class="fas fa-phone"></i><a href="#"> 97173265478</a></li>
                <li><i class="fas fa-fax"></i><a href="#">97173265478</a></li>
                <li><i class="fas fa-envelope"></i><a href="#">info@aldaarmarriage.ae</a></li>
              </ul>
            </div>
          </div>


          <div class="col-sm-6 col-12 col-md-3 col-lg-3">
            <div class="col1 fw-bold mt-4">
              <p>روابط</p>
              <ul class="lik">
                <li><i class="fas fa-map-marker-alt"></i><a href="#">من نحن</a></li>
                <li><i class="fas fa-phone"></i><a href="#"> تعليمات</a></li>
                <li><i class="fas fa-fax"></i><a href="#">سياسة الخصوصية</a></li>
                <li><i class="fas fa-envelope"></i><a href="#">info@aldaarmarriage.ae</a></li>
              </ul>
            </div>
          </div>

          <div class="col-sm-6 col-12 col-md-3 col-lg-3">
            <div class="col1 fw-bold mt-3">

              <p>تغريدات</p>
              <ul class="twPost text-white">
                <div class="row">
                  <div class="col-sm-3">
                    <li>
                      <div class="box text-center">
                        <p>1</p>
                        <span>Jan  2020 </span>
                      </div>
                    </li>
                  </div>
                  <div class="col-sm-9">
                    <li>
                      لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء
                    </li>
                  </div>
                </div>



                <div class="row">
                  <div class="col-sm-3">
                    <li>
                      <div class="box text-center">
                        <p>1</p>
                        <span>Jan  2020 </span>
                      </div>
                    </li>
                  </div>
                  <div class="col-sm-9">
                    <li>
                      لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء
                    </li>
                  </div>
                </div>



                <div class="row">
                  <div class="col-sm-3">
                    <li>
                      <div class="box text-center">
                        <p>1</p>
                        <span>Jan  2020 </span>
                      </div>
                    </li>
                  </div>
                  <div class="col-sm-9">
                    <li>
                      لوريم ايبسوم هو نموذج افتراضي يوضع في التصاميم لتعرض على العميل ليتصور طريقه وضع النصوص بالتصاميم سواء
                    </li>
                  </div>
                </div>

              </ul>

            </div>
          </div>




        </div>
      </div>
    </footer>

    <div class="footerBTM">
      <div class="container">
        <div class="row">
          <div class="col-md-6 text-center text-white">  2021 © جميع الحقوق محفوظة لموقع الدار لخدمات الزواج
          </div>

          <div class="col-md-6 text-start">
            <a class="text-white" href="https://skilledtech.co">
              تصميم وبرمجة سكيلد تيك
            </a>
          </div>

        </div>
      </div>
    </div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
