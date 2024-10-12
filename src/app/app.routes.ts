import { Routes } from '@angular/router';
import { NhacungcapListComponent } from './admin/suppliers/nhacungcap-list/nhacungcap-list.component';
import { NhacungcapFormComponent } from './admin/suppliers/nhacungcap-form/nhacungcap-form.component';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { ProductFormComponent } from './admin/products/product-form/product-form.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';
// import { AccountsListComponent } from './admin/accounts/account-list/account-list.component';

import { AccountFormComponent } from './admin/accounts/account-form/account-form.component'; 
import { AccountListComponent } from './admin/accounts/account-list/account-list.component';

import { DonHangListComponent } from './admin/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './admin/orders/order-detail/order-detail.component';

import { StatisticsComponent } from './admin/statistics/statistics.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { ProductDetailComponent } from './user/product-detail/product-detail.component';
import { DashboardUserComponent } from './user/dashboard-user/dashboard-user.component';
import { CartComponent } from './user/cart/cart.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './user/order/order.component';
import { OrderHistoryComponent } from './user/order-history/order-history.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Đường dẫn mặc định

  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },

  // Các đường dẫn cho admin layout
  {
    path: 'admin',
    component: AdminLayoutComponent, canActivate: [AuthGuard] ,
    children: [
      { path: 'dashboard', component: DashboardComponent },

      { path: 'suppliers', component: NhacungcapListComponent},
      { path: 'suppliers/new', component: NhacungcapFormComponent},
      { path: 'suppliers/edit/:id', component: NhacungcapFormComponent},

      { path: 'accounts', component: AccountListComponent},
      { path: 'accounts/new', component: AccountFormComponent},
      { path: 'accounts/edit/:id', component: AccountFormComponent},

      { path: 'products', component: ProductListComponent},
      { path: 'products/new', component: ProductFormComponent},
      { path: 'products/edit/:id', component: ProductFormComponent},

      { path: 'orders', component: DonHangListComponent },
      { path: 'orders/details/:id', component: OrderDetailsComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }  // Đường dẫn mặc định cho admin
    ]
  },


  // Các đường dẫn cho user layout
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'products', component: DashboardUserComponent },
      { path: 'products/:id', component: ProductDetailComponent },

      { path: 'cart', component: CartComponent},
      { path: 'order/:id', component: OrderComponent},
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }  // Đường dẫn mặc định cho admin
    ]
  },
];
