import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './modules/tabs/tabs.module#TabsModule'
    },
    {
        path: '',
        loadChildren: './modules/signin/signin.module#SigninModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
