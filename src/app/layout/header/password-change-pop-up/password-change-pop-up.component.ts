import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-change-pop-up',
  templateUrl: './password-change-pop-up.component.html',
  styleUrls: ['./password-change-pop-up.component.sass']
})
export class PasswordChangePopUpComponent implements OnInit {
  eyeShowForConform = false;
  showConformPassword = false;
  showOldPassword = false;
  eyeShowForOld = false;
  showNewPassword = false;
  eyeShowForNew = false;
  constructor() { }

  ngOnInit(): void {
  }

  public eyeToggelForOldPassword() {
    this.showOldPassword = !this.showOldPassword;
    this.eyeShowForOld = !this.eyeShowForOld;
  }
  public eyeToggelForNewPassword() {
    this.showNewPassword = !this.showNewPassword;
    this.eyeShowForNew = !this.eyeShowForNew;
  }
  public eyeToggelForComformPassword() {
    this.showConformPassword = !this.showConformPassword;
    this.eyeShowForConform = !this.eyeShowForConform;
  }

}
