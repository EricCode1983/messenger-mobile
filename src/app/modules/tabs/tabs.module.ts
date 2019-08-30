import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabsRoutingModule } from './tabs-routing.module';
import { HomeModule } from '../home/home.module';
import { AccountModule } from '../account/account.module';
import { NotificationModule } from '../notification/notification.module';
import { ReportModule } from '../report/report.module';
import { ContactModule } from '../contact/contact.module';
import { ChatModule } from '../chat/chat.module';

@NgModule({
    declarations: [TabsComponent],
    imports: [IonicModule, CommonModule, FormsModule, TabsRoutingModule, HomeModule, NotificationModule, AccountModule, ContactModule, ChatModule, ReportModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsModule {}
