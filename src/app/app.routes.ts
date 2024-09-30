import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { FlooringComponent } from './flooring/flooring.component';
import { WallingComponent } from './walling/walling.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SubProductDetailComponent } from './components/sub-product-detail/sub-product-detail.component';
import { SubSubProductDetailComponent } from './components/sub-sub-product-detail/sub-sub-product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'walling',
    component: WallingComponent
  },
  {
    path: 'flooring', 
    component: FlooringComponent, 
    children: [
      {
        path: ':product',
        component: ProductDetailComponent,  
        children: [
          {
            path: ':subProduct',
            component: SubProductDetailComponent,  
            children: [
              {
                path: ':subSubProduct',
                component: SubSubProductDetailComponent
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
