import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractFormModalComponent } from './contract-form-modal.component';

describe('ContractFormModalComponent', () => {
  let component: ContractFormModalComponent;
  let fixture: ComponentFixture<ContractFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
