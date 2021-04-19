import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['', [Validators.required, Validators.minLength(4)]],
      tel: ['', [Validators.required, Validators.pattern(/(0\d{2})-\d{7}$/)]],
      email: ['', [Validators.required, Validators.email]],
      note: ['', [Validators.required]],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.httpClient.post("http://localhost:3000/post", this.userForm.value, { responseType: 'text' }).subscribe();
    alert('SUCCESS!!');
    this.userForm.reset();
  }
}
