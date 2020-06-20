import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http/http.service";
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  postData = {

    category: {
      name: ''
    },
    body: '',
    email: '',
    contact: '',
    phone: ''

  };

  constructor(private http: HttpService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.postData.email)) {
      return true;
    }
    return false;
  }

  validatePhone() {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (this.postData.phone.match(phoneno)) {
      return true;
    }
    else {
      return false;
    }
  }

  submitMessage() {
    if (this.postData.body && this.postData.category.name && this.postData.email && this.postData.contact) {
      if (this.postData.phone && !this.validatePhone()) {
        this.alertService.warning(
          'Lütfen doğru bir telefon numarası giriniz'
        );
        return false;
      }
      if (!this.validateEmail()) {
        this.alertService.warning(
          'Lütfen doğru bir email adresi giriniz'
        );
        return false;
      }

      this.http.contact('contact/', this.postData).subscribe(() => {
        this.alertService.success(
          'Mesajınız başarılı bir şekilde iletilmiştir'
        );
      },
        (error: any) => {
          this.alertService.warning(error);
        });
    }

    else {
      this.alertService.warning('Lütfen yıldızlı alanları doldurunuz');
    }

  }

}
