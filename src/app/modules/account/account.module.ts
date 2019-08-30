import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountComponent } from "./account/account.component";

@NgModule({
    declarations: [AccountComponent],
    imports: [CommonModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule {}
