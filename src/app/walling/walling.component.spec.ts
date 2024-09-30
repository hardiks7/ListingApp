import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallingComponent } from './walling.component';

describe('WallingComponent', () => {
  let component: WallingComponent;
  let fixture: ComponentFixture<WallingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WallingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
