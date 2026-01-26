import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientGetDto } from '../../../models/client.dto';
import { ClientApi } from '../../../api/client.api';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { ContractDetailsModalComponent } from '../../../../contract/components/contract-details-modal/contract-details-modal.component';
import { ClientFormModalComponent } from '../../client-form-modal/client-form-modal.component';
import { ContractFormModalComponent } from '../../../../contract/components/contract-form-modal/contract-form-modal.component';

@Component({
  selector: 'app-client-details-modal',
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    DatePipe,
    ContractDetailsModalComponent,
    ClientFormModalComponent,
    ContractFormModalComponent
  ],
  templateUrl: './client-details-modal.component.html',
  styleUrl: './client-details-modal.component.scss'
})
export class ClientDetailsModalComponent implements OnChanges {
  @Input() public clientId!: string;
  @Output() public close = new EventEmitter<void>();

  public client$!: Observable<ClientGetDto>;
  public selectedContractId: string | null = null;
  public showUpdateForm = false;
  public showContractForm = false;
  public isUpdating = false;
  public error: string | null = null;

  constructor(private readonly clientApi: ClientApi) { }
  ngOnChanges(): void {
    this.loadClient();
  }

  public onUpdateDetails(): void {
    // TODO: Implement update client details modal/form
  }

  public onToggleStatus(): void {
    this.isUpdating = true;
    this.error = null;

    this.clientApi.toggleStatus(this.clientId).subscribe({
      next: () => {
        this.isUpdating = false;
        this.loadClient();
      },
      error: (er) => {
        this.isUpdating = false;
        this.error = er.error?.message || "Failed to toggle status";
      }
    });
  }

  public onClientUpdated(): void {
    this.showUpdateForm = false;
    this.loadClient();
  }

  public onContractAdded(): void {
    this.showContractForm = false;
    this.loadClient();
  }

  public onContractSelected(contractId: string): void {
    this.selectedContractId = contractId;
  }

  public onContractModalClosed(): void {
    this.selectedContractId = null;
   this.loadClient();
  }

  public onClose(): void {
    this.close.emit();
  }

  private loadClient() {
    this.client$ = this.clientApi.getById(this.clientId);
  }
}
