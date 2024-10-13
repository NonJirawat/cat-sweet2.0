import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CatProfileComponent } from './cat-profile/cat-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' } , // หน้าแรกให้ไปที่ login
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'cat-profile', component: CatProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
