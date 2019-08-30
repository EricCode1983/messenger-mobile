import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvoComponent } from './convo/convo.component';

const routes: Routes = [
  { path: 'convo/:msgFrom/:msgTo/:msgType/:groupChatId/:title', component: ConvoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
