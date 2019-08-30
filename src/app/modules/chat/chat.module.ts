import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ChatComponent],
    imports: [CommonModule, SharedModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatModule {}
