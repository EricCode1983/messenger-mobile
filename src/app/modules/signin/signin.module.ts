import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SigninRoutingModule } from './signin-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [SigninComponent, RegisterComponent],
    imports: [IonicModule, CommonModule, SigninRoutingModule, ReactiveFormsModule, FormsModule, SharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SigninModule {}
