import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TabsComponent } from './tabs/tabs.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ConvoComponent } from './convo/convo.component';
import { IonicModule } from '@ionic/angular';
import { FriendChatComponent } from './friend-chat/friend-chat.component';
import { ConfirmComponent } from './popup/confirm/confirm.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TabsComponent,
    AddFriendComponent,
    ConvoComponent,
    FriendChatComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedRoutingModule
  ],
  exports: [
    NavbarComponent,
    TabsComponent,
    AddFriendComponent,
    FriendChatComponent,
    ConfirmComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
