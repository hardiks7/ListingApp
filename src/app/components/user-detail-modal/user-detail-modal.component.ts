import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { joiningDateAfterBirthdateValidator } from '../../pages/validators/date-validator';
import { emailDomainValidator } from '../../pages/validators/encodedotsEmailValidator';
import { abnValidator } from '../../pages/validators/model.component';

@Component({
  selector: 'app-user-detail-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule,],
  templateUrl: './user-detail-modal.component.html',
})
export class UserDetailModalComponent implements OnInit {
  isNew: boolean;
  userForm!: FormGroup;
  isViewMode: boolean;
  hobbyList = ['Reading', 'Cooking', 'Gaming', 'Traveling', 'Swimming', 'Cycling'];

  constructor(
    public dialogRef: MatDialogRef<UserDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.isNew = data.isNew || false;
    this.isViewMode = data.isViewMode;
  }

  ngOnInit(): void {
    this.initializeForm(this.data);

    if (!this.isNew) {
      this.patchUserDetail();
    }
  }

  initializeForm(data: any): void {
    this.userForm = this.fb.group({
      userId: [{ value: data?.userId || '', disabled: true }],
      username: [data?.username || '', Validators.required],
      fullName: [data?.fullName || '', Validators.required],
      email: [
        data?.email || '',
        [
          Validators.required,
          Validators.email,
          emailDomainValidator(), // Add custom email validator
        ]],
      location: [data?.location || '', Validators.required],
      contactInfo: this.fb.group({
        phone: [data?.contactInfo?.phone || '', Validators.required],
        secondaryEmail: [data?.contactInfo?.secondaryEmail || '', [Validators.required, Validators.email]],
        joinedDate: [data?.contactInfo?.joinedDate || '', Validators.required]
      }),
      bio: [data?.bio || '', Validators.required],
      hobbies: this.fb.array(this.hobbyList.map(() => false), this.hobbyValidator),
      birthdate: [data?.birthdate || '', Validators.required],
      language: [data?.language || '', Validators.required],
      education: [data?.education || '', Validators.required],
      work: [data?.work || '', Validators.required],
      relationshipStatus: [data?.relationshipStatus || '', Validators.required],
      gender: [data?.gender || '', Validators.required],
      pronouns: [data?.pronouns || '', Validators.required],
      interests: [data?.interests || '', Validators.required],
      abn: ['', [Validators.required, abnValidator()]],
    }, {
      validators: joiningDateAfterBirthdateValidator()
    });
  }

  get hobbyFormArray(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  // Validator function to limit selected hobbies
  hobbyValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const formArray = control as FormArray;
    const selectedHobbies = formArray.controls.filter(c => c.value).length;
    return selectedHobbies > 2 ? { 'hobbyLimit': true } : null;
  }

  onHobbyChange(event: Event, index: number): void {
    const formArray = this.hobbyFormArray;
    const isChecked = (event.target as HTMLInputElement).checked;
    formArray.at(index).setValue(isChecked);
    formArray.markAsTouched();
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userData = this.userForm.getRawValue();
    console.log('User data:', userData);

    if (this.isNew) {
      this.userService.createUser(userData).subscribe(
        (res) => {
          alert('User created successfully!');
          this.dialogRef.close(res);
        },
        (error) => console.error('Error creating user', error)
      );
    } else {
      this.userService.updateUser(userData).subscribe(
        (res) => {
          alert('User updated successfully!');
          this.dialogRef.close(res);
        },
        (error) => console.error('Error updating user', error)
      );
    }
  }

  patchUserDetail(): void {
    this.userForm.patchValue({
      username: this.data?.username,
      fullName: this.data?.fullName,
      email: this.data?.email,
      location: this.data?.location,
      bio: this.data?.bio,
      gender: this.data?.gender,
      birthdate: new Date(this.data?.birthdate).toISOString().split('T')[0],
      relationshipStatus: this.data?.relationshipStatus,
      pronouns: this.data?.pronouns,
      interests: this.data?.interests,
    });

    this.userForm.get('contactInfo')?.patchValue({
      phone: this.data?.contactInfo?.phone,
      secondaryEmail: this.data?.contactInfo?.secondaryEmail,
      joinedDate: new Date(this.data?.contactInfo?.joinedDate).toISOString().split('T')[0]
    });

    if (this.data?.hobbies) {
      this.hobbyList.forEach((hobby, index) => {
        if (this.data.hobbies.includes(hobby)) {
          this.hobbyFormArray.at(index).setValue(true);
        }
      });
    }
  }
  
  // Inside your UserDetailModalComponent class
  formatABN(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    let abn = input.value.replace(/\s+/g, ''); // Remove any existing spaces

    if (abn.length > 2) {
      abn = abn.substring(0, 2) + ' ' + abn.substring(2);
    }
    if (abn.length > 6) {
      abn = abn.substring(0, 6) + ' ' + abn.substring(6);
    }
    if (abn.length > 10) {
      abn = abn.substring(0, 10) + ' ' + abn.substring(10);
    }

    input.value = abn;
    this.userForm.get('abn')?.setValue(abn); // Update the form control value
  }

}

