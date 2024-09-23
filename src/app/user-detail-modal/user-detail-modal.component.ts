import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule],
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.css']
})
export class UserDetailModalComponent {

  isNew: boolean;
  user: any;

  constructor(
    public dialogRef: MatDialogRef<UserDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.isNew = data.isNew || false;  // Use 'isNew' to distinguish between create and update
    this.user = data || {};

    if (!this.user.contactInfo) {
      this.user.contactInfo = {
        phone: '',
        secondaryEmail: '',
        joinedDate: ''
      };
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.isNew) {
      this.userService.createUser(this.user).subscribe(response => {
        console.log('User created:', response);
        this.dialogRef.close();
      });
    } else {
      this.userService.updateUser(this.user).subscribe(response => {
        console.log('User updated:', response);
        this.dialogRef.close();
      });
    }
  }
}
