import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-user-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-detail-modal.component.html',
})
export class UserDetailModalComponent {
  isNew: boolean;
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.isNew = data.isNew || false;
    
    // Initialize the form
    this.userForm = this.fb.group({
      userId: [{ value: data?.userId, disabled: true }],
      username: [data?.username, Validators.required],
      fullName: [data?.fullName, Validators.required],
      email: [data?.email, [Validators.required, Validators.email]],
      location: [data?.location, [Validators.required]],
      contactInfo: this.fb.group({
        phone: [data?.contactInfo?.phone, [Validators.required]],
        secondaryEmail: [data?.contactInfo?.secondaryEmail, [Validators.email]],
        joinedDate: [data?.contactInfo?.joinedDate, [Validators.required]]
      }),
      bio: [data?.bio, [Validators.required]],
      hobbies: [data?.hobbies, [Validators.required]],
      birthdate: [data?.birthdate, [Validators.required]],
      language: [data?.language, [Validators.required]],
      education: [data?.education, [Validators.required]],
      work: [data?.work, [Validators.required]],
      relationshipStatus: [data?.relationshipStatus, [Validators.required]],
      gender: [data?.gender, [Validators.required]],
      pronouns: [data?.pronouns, [Validators.required]],
      interests: [data?.interests, [Validators.required]],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;

    if (this.isNew) {
      this.userService.createUser(userData).subscribe(res => {
        console.log('User created:', res);
        alert('User created successfully!');
        this.dialogRef.close();
      });
    } else {
      this.userService.updateUser(userData).subscribe(res => {
        console.log('User updated:', res);
        alert('User updated successfully!');
        this.dialogRef.close();
      });
    }
  }
}
