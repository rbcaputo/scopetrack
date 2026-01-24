import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliverableGetDto, DeliverablePatchDto } from '../../models/deliverable.dto';
import { DeliverableApi } from '../../api/deliverable.api';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-deliverable-details-modal',
  imports: [NgIf, NgForOf, AsyncPipe, DatePipe],
  templateUrl: './deliverable-details-modal.component.html',
  styleUrl: './deliverable-details-modal.component.scss'
})
export class DeliverableDetailsModalComponent implements OnChanges {
  @Input() public deliverableId!: string;
  @Output() public close = new EventEmitter<void>();

  public deliverable$!: Observable<DeliverableGetDto>;
  public isUpdating = false;
  public error: string | null = null;

  public readonly availableStatuses = [
    "Pending",
    "InProgress",
    "Completed",
    "Cancelled"
  ];

  constructor(private readonly deliverableApi: DeliverableApi) { }
  ngOnChanges(): void {
    this.loadDeliverable();
  }

  public onStatusChange(newStatus: string): void {
    this.isUpdating = true;
    this.error = null;

    const dto: DeliverablePatchDto = { newStatus };

    this.deliverableApi.patchStatus(this.deliverableId, dto).subscribe({
      next: () => {
        this.isUpdating = false;
        this.loadDeliverable();
      },
      error: (er) => {
        this.isUpdating = false;
        this.error = er.error || "Failed to update status";
      }
    });
  }

  public onClose(): void {
    this.close.emit();
  }

  private loadDeliverable(): void {
    this.deliverable$ = this.deliverableApi.getById(this.deliverableId);
  }
}
