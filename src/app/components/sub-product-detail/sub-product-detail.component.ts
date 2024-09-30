import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sub-product-detail',
  standalone:true,
  imports:[RouterOutlet,CommonModule],
  templateUrl: './sub-product-detail.component.html',
  styleUrls: ['./sub-product-detail.component.css']
})
export class SubProductDetailComponent implements OnInit {
  subProduct: string | null = null;
  subSubProducts = ['N', 'M'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subProduct = this.route.snapshot.paramMap.get('subProduct');
  }

  viewSubSubProduct(subSubProduct: string) {
    this.router.navigate([`${subSubProduct}`], { relativeTo: this.route });
  }
}
