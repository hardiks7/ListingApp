import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-flooring',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './flooring.component.html',
  styleUrls: ['./flooring.component.css']
})
export class FlooringComponent {
  products = ['ABC', 'DEF', 'GHI'];  

  constructor(private router: Router) {}

  viewProduct(product: string) {
    this.router.navigate([`/flooring/${product}`]);
  }
}
