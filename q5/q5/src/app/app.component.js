"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let AppComponent = class AppComponent {
    constructor(formBuilder, httpClient) {
        this.formBuilder = formBuilder;
        this.httpClient = httpClient;
    }
    ngOnInit() {
        this.userForm = this.formBuilder.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4)]],
            surname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4)]],
            tel: ['', [forms_1.Validators.required, forms_1.Validators.pattern(/(0\d{2})-(\d{7})/)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            note: ['', [forms_1.Validators.required]],
        });
    }
    get f() {
        return this.userForm.controls;
    }
    onSubmit() {
        this.httpClient.post("http://localhost:3000/post", this.userForm.value).subscribe((data) => {
            console.log(data);
        });
        alert('SUCCESS!!');
        this.userForm.reset();
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
    })
], AppComponent);
exports.AppComponent = AppComponent;
