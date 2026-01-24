import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverableDetailsModalComponent } from './deliverable-list.component';

describe('DeliverableDetailsModalComponent', () => {
  let component: DeliverableDetailsModalComponent;
  let fixture: ComponentFixture<DeliverableDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverableDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverableDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
