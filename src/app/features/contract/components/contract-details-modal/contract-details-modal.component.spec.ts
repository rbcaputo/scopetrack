import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDetailsModalComponent } from './contract-details-modal.component';

describe('ContractDetailsModalComponent', () => {
  let component: ContractDetailsModalComponent;
  let fixture: ComponentFixture<ContractDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
