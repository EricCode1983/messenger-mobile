import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [NotificationComponent],
    imports: [CommonModule, SharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NotificationModule {}
