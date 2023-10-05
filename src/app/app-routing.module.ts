import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPage} from "./pages/dashboard/dashboard.page";
import {AddressBookPage} from "./pages/address-book/address-book.page";
import {InvitationsPage} from "./pages/invitations/invitations.page";
import {HomePage} from "./pages/home/home.page";

const routes: Routes = [
  {path: 'address-book', component: AddressBookPage, data: {animation: 'Address book'}},
  {path: 'invitations', component: InvitationsPage, data: {animation: 'Invitations'}},
  {path: 'dashboard', component: DashboardPage, data: {animation: 'Dashboard'}},
  {path: '', component: HomePage, data: {animation: 'Home'}},
  {path: 'home', redirectTo: '', data: {animation: 'Home'}},
  {path: '**', redirectTo: '', data: {animation: 'Home'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
