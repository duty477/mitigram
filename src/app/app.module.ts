import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {SwiperModule} from 'swiper/angular';

import {AppComponent} from './app.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import {MenuComponent} from './partials/menu/menu.component';
import {LoaderComponent} from './partials/loader/loader.component';
import {ButtonComponent} from './core/button/button.component';
import {CtaComponent} from './core/cta/cta.component';
import {DashboardPage} from './pages/dashboard/dashboard.page';
import {AddressBookPage} from './pages/address-book/address-book.page';
import {InvitationsPage} from './pages/invitations/invitations.page';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersListComponent} from './partials/users-list/users-list.component';
import {CheckboxComponent} from './core/checkbox/checkbox.component';
import {EmptyListComponent} from './partials/empty-list/empty-list.component';
import {InputComponent} from './core/input/input.component';
import {FilterUsersPipe} from './pipes/filter-users.pipe';
import {AlertModalComponent} from './partials/alert-modal/alert-modal.component';
import {EmailsListModalComponent} from './partials/emails-list-modal/emails-list-modal.component';
import {NotificationComponent} from './partials/notification/notification.component';
import {UsersShortListComponent} from './partials/users-short-list/users-short-list.component';
import {ToggleBtnComponent} from './core/toggle-btn/toggle-btn.component';
import {AutocompleteComponent} from "./core/autocomplete/autocomplete.component";
import {NewUsersModalComponent} from './partials/new-users-modal/new-users-modal.component';
import {HomePage} from './pages/home/home.page';
import {ButtonIconComponent} from './core/button-icon/button-icon.component';

const playerFactory = () => player;

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoaderComponent,
    ButtonComponent,
    CtaComponent,
    DashboardPage,
    AddressBookPage,
    InvitationsPage,
    UsersListComponent,
    CheckboxComponent,
    EmptyListComponent,
    InputComponent,
    FilterUsersPipe,
    AlertModalComponent,
    EmailsListModalComponent,
    NotificationComponent,
    UsersShortListComponent,
    ToggleBtnComponent,
    NewUsersModalComponent,
    AutocompleteComponent,
    HomePage,
    ButtonIconComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    LottieModule.forRoot({player: playerFactory}),
    FormsModule,
    MatDialogModule,
    SwiperModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [FilterUsersPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
