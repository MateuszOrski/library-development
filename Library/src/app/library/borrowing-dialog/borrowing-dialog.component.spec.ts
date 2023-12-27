import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingDialogComponent } from './borrowing-dialog.component';

describe('BorrowingDialogComponent', () => {
  let component: BorrowingDialogComponent;
  let fixture: ComponentFixture<BorrowingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
