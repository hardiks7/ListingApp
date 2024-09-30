import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubProductDetailComponent } from './sub-sub-product-detail.component';

describe('SubSubProductDetailComponent', () => {
  let component: SubSubProductDetailComponent;
  let fixture: ComponentFixture<SubSubProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSubProductDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubSubProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
