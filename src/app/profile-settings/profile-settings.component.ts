import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {

  detail: boolean = false;
  checked: boolean = false;
  fbUrl: string = '';

  constructor() { }

  ngOnInit(): void {
    if (this.fbUrl = localStorage.getItem('fbUrl')) {
      this.detail = true;
      this.checked = true;
    }
  }

  toggle(): void {
    this.detail = !this.detail;
  }

  save(): void {
    localStorage.setItem('fbUrl', this.fbUrl);
  }
}
