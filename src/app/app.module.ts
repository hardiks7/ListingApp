import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';
import { UserDetailModalComponent } from './components/user-detail-modal/user-detail-modal.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    MatDialogModule, 
    MatButtonModule, 
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    // ToastrModule.forRoot()
    UserDetailModalComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: []
})
export class AppModule { }
