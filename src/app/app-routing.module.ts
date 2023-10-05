import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPage} from "./pages/dashboard/dashboard.page";
import {AddressBookPage} from "./pages/address-book/address-book.page";
import {InvitationsPage} from "./pages/invitations/invitations.page";
import {HomePage} from "./pages/home/home.page";

const routes: Routes = [
  {path: 'address-book', component: AddressBookPage, data: {animation: 'Page'}},
  {path: 'invitations', component: InvitationsPage, data: {animation: 'Page'}},
  {path: 'dashboard', component: DashboardPage, data: {animation: 'Page'}},
  {path: '', component: HomePage, data: {animation: 'Page'}},
  {path: 'home', redirectTo: '', data: {animation: 'Page'}},
  {path: '**', redirectTo: '', data: {animation: 'Page'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
