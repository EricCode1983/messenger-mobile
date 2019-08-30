import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from '../home/home/home.component';
import { AccountComponent } from '../account/account/account.component';
import { ChatComponent } from '../chat/chat/chat.component';
import { ContactComponent } from '../contact/contact/contact.component';
import { NotificationComponent } from '../notification/notification/notification.component';
import { ReportComponent } from '../report/report/report.component';

const routes: Routes = [
    {
        path: 'tab',
        component: TabsComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'chat',
                component: ChatComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'notification',
                component: NotificationComponent
            },
            {
                path: 'report',
                component: ReportComponent
            },
            {
                path: 'account',
                component: AccountComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsRoutingModule {}
