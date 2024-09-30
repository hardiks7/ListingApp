import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailModalComponent } from '../user-detail-modal/user-detail-modal.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      console.log("Data:", data);

      this.users = data.map((user: any) => {
        const joinedDate = new Date(user.joinedDate);
        const day = String(joinedDate.getDate()).padStart(2, '0');
        const month = String(joinedDate.getMonth() + 1).padStart(2, '0');
        const year = joinedDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        return {
          userId: user.userId || '-',
          username: user.username || '-',
          fullName: user.fullName || '-',
          email: user.email || '-',
          profilePic: user.profilePic || 'https://via.placeholder.com/50',
          location: user.location || '-',
          contactInfo: {
            phone: user.contactInfo?.phone || '-',
            joinedDate: formattedDate
          },
          bio: user.bio || '-',
          hobbies: user.hobbies || '-',
          birthdate: user.birthdate || '-',
          language: user.language || '-',
          education: user.education || '-',
          work: user.work || '-',
          relationshipStatus: user.relationshipStatus || '-',
          gender: user.gender || '-',
          pronouns: user.pronouns || '-',
          interests: user.interests || '-'
        };
      });
    });
  }

  

  // Open the edit dialog when clicking the edit icon
  openEditDialog(user: any): void {
    this.dialog.open(UserDetailModalComponent, {
      data: { ...user, isEditMode: true },
      width: '600px'
    });
  }

  // Delete user action
  onDeleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.userId !== userId);
        alert('User deleted successfully');
      });
    }
  }

  // Open the dialog for creating a new user
  onCreateNewUser() {
    this.dialog.open(UserDetailModalComponent, {
      data: { isNew: true },
      width: '600px'
    });
  }
}
