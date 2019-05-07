import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';


import {AuthService} from './auth-service/auth.service';
import { User } from './shared/services/user';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ChefProfileComponent } from './chef-profile/chef-profile.component';
import { AddProfileComponent } from './add-profile/add-profile.component';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChefBrowseComponent } from './chef-browse/chef-browse.component';
import { CommonHeaderComponent } from './common-header/common-header.component';
import { CommonFooterComponent } from './common-footer/common-footer.component';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const appRoutes: Routes = [
  { path: 'register', component: AddProfileComponent},
  { path: 'profile/:id', component: ChefProfileComponent },
  { path: 'home', component: HomeComponent},
  { path: 'browse', component: ChefBrowseComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'verify', component: VerifyEmailComponent},
  { path: 'edit', component: EditProfileComponent},
  { path: 'upload-test', component: UploadFormComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  declarations: [
    AppComponent,
    ChefProfileComponent,
    AddProfileComponent,
    HomeComponent,
    ChefBrowseComponent,
    CommonHeaderComponent,
    CommonFooterComponent,
    UploadFormComponent,
    SignInComponent,
    VerifyEmailComponent,
    EditProfileComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule, // for database
  ],
  providers: [AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {


}


