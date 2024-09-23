import { Component, Inject } from '@angular/core'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-detail-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.css']
})
export class UserDetailModalComponent {

  imageSize: number = 100;

  constructor(
    public dialogRef: MatDialogRef<UserDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  toggleImageSize(): void {
    this.imageSize = this.imageSize === 100 ? 200 : 100;
  }
}
