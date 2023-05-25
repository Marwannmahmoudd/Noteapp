import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { NotedataComponent } from './notedata/notedata.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipe } from './filter.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import {MatMenuModule} from '@angular/material/menu';
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderInterceptor } from './header.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NotedataComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    SweetAlert2Module.forRoot() ,
    MatMenuModule,
    NgxSpinnerModule
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
