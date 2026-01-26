import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverableFormModalComponent } from './deliverable-form-modal.component';

describe('DeliverableFormModalComponent', () => {
  let component: DeliverableFormModalComponent;
  let fixture: ComponentFixture<DeliverableFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverableFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverableFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
