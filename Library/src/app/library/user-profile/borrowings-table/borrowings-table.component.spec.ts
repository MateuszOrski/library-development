import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingsTableComponent } from './borrowings-table.component';

describe('BorrowingsTableComponent', () => {
  let component: BorrowingsTableComponent;
  let fixture: ComponentFixture<BorrowingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowingsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
