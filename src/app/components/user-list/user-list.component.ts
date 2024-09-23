import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserDetailModalComponent } from '../../user-detail-modal/user-detail-modal.component';
import { MatDialog } from '@angular/material/dialog'; 

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
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

  openDialog(user: any): void {
    this.dialog.open(UserDetailModalComponent, {
      data: user,
      width: '600px' 
    });
  }
}
