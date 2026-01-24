import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractGetDto } from '../../models/contract.dto';
import { ContractApi } from '../../api/contract.api';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-contract-details-modal',
  imports: [NgIf, AsyncPipe],
  templateUrl: './contract-details-modal.component.html',
  styleUrl: './contract-details-modal.component.scss'
})
export class ContractDetailsModalComponent implements OnChanges {
  @Input() public contractId!: string;
  @Output() public close = new EventEmitter<void>();

  public contract$!: Observable<ContractGetDto>;
  public selectedDeliverableId: string | null = null;

  constructor(private readonly contractApi: ContractApi) { }

  ngOnChanges(): void {
    this.contract$ = this.contractApi.getById(this.contractId);
  }

  public onDeliverableSelected(id: string) {
    this.selectedDeliverableId = id;
  }

  public onDeliverableModalClosed(): void {
    this.selectedDeliverableId = null;
  }

  public onClose(): void {
    this.close.emit();
  }
}
