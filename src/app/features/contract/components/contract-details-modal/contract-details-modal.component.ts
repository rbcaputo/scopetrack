import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractGetDto, ContractPatchDto } from '../../models/contract.dto';
import { ContractApi } from '../../api/contract.api';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { DeliverableDetailsModalComponent } from '../../../deliverables/components/deliverable-details-modal/deliverable-details-modal.component';
import { DeliverableFormModalComponent } from '../../../deliverables/components/deliverable-form-modal/deliverable-form-modal.component';

@Component({
  selector: 'app-contract-details-modal',
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    DatePipe,
    DeliverableDetailsModalComponent,
    DeliverableFormModalComponent
  ],
  templateUrl: './contract-details-modal.component.html',
  styleUrl: './contract-details-modal.component.scss'
})
export class ContractDetailsModalComponent implements OnChanges {
  @Input() public contractId!: string;
  @Output() public close = new EventEmitter<void>();

  public contract$!: Observable<ContractGetDto>;
  public selectedDeliverableId: string | null = null;
  public showDeliverableForm = false;
  public isUpdating = false;
  public error: string | null = null;

  public readonly availableStatuses = [
    "Draft",
    "Active",
    "Completed",
    "Archived"
  ];

  constructor(private readonly contractApi: ContractApi) { }
  ngOnChanges(): void {
    this.loadContract();
  }

  public onStatusChange(newStatus: string): void {
    this.isUpdating = true;
    this.error = null;

    const dto: ContractPatchDto = { newStatus };

    this.contractApi.patchStatus(this.contractId, dto).subscribe({
      next: () => {
        this.isUpdating = false;
        this.loadContract();
      },
      error: (er) => {
        this.isUpdating = false;
        this.error = er.error?.message || "Failed to update status";
      }
    });
  }

  public onDeliverableAdded(): void {
    this.showDeliverableForm = false;
    this.loadContract();
  }

  public onDeliverableSelected(id: string) {
    this.selectedDeliverableId = id;
  }

  public onDeliverableModalClosed(): void {
    this.selectedDeliverableId = null;
    this.loadContract();
  }

  public onClose(): void {
    this.close.emit();
  }

  private loadContract(): void {
     this.contract$ = this.contractApi.getById(this.contractId);
  }
}
