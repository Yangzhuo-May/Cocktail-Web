import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import { CategoryComponent } from './pages/home/components/category/category.component';
import { DetailComponent } from './pages/detail/detail/detail.component';
import { HomeComponent } from './pages/home/home/home.component';
import { ListComponent } from './pages/list/list/list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list', component: ListComponent},
    { path: 'detail/:id', component: DetailComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}