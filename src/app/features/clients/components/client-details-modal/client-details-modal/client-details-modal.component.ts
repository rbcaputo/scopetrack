import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientGetDto } from '../../../models/client.dto';
import { ClientApi } from '../../../api/client.api';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { ContractDetailsModalComponent } from '../../../../contract/components/contract-details-modal/contract-details-modal.component';

@Component({
  selector: 'app-client-details-modal',
  imports: [NgIf, NgForOf, AsyncPipe, DatePipe, ContractDetailsModalComponent],
  templateUrl: './client-details-modal.component.html',
  styleUrl: './client-details-modal.component.scss'
})
export class ClientDetailsModalComponent implements OnChanges {
  @Input() public clientId!: string;
  @Output() public close = new EventEmitter<void>();

  public client$!: Observable<ClientGetDto>;
  public selectedContractId: string | null = null;

  constructor(private readonly clientApi: ClientApi) { }
  ngOnChanges(): void {
    this.client$ = this.clientApi.getById(this.clientId);
  }

  public onContractSelected(contractId: string): void {
    this.selectedContractId = contractId;
  }

  public onContractModalClosed(): void {
    this.selectedContractId = null;
    this.client$ = this.clientApi.getById(this.clientId);
  }

  public onClose(): void {
    this.close.emit();
  }
}
