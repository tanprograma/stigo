import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() users!: User[];
  @Output() onLogin = new EventEmitter<User>();
  constructor() {}
  user: User = {
    username: '',
    password: '',
  };
  isPassword = true;

  ngOnInit(): void {}
  login() {
    this.onLogin.emit(this.user);
    this.user = { password: '', username: '' };
    this.isPassword = true;
  }
  show() {
    this.isPassword = !this.isPassword;
  }
}
