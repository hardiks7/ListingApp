import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports:[RouterOutlet,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: string | null = null;
  subProducts = ['PQR', 'XYZ'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.product = this.route.snapshot.paramMap.get('product');
  }

  viewSubProduct(subProduct: string) {
    this.router.navigate([`${subProduct}`], { relativeTo: this.route });
  }
}
