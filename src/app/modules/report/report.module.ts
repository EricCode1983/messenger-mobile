import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ReportComponent],
    imports: [CommonModule, SharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportModule {}
