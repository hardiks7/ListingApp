import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-sub-product-detail',
  templateUrl: './sub-sub-product-detail.component.html',
  styleUrls: ['./sub-sub-product-detail.component.css']
})
export class SubSubProductDetailComponent implements OnInit {
  subSubProduct: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subSubProduct = this.route.snapshot.paramMap.get('subSubProduct');
  }
}
