import { Component, OnInit } from '@angular/core';
import { ContractGetDto } from '../../../models/contract.dto';
import { Observable } from 'rxjs';
import { ContractApi } from '../../../api/contract.api';
import { ContractListComponent } from '../../../components/contract-list/contract-list.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { ContractDetailsModalComponent } from '../../../components/contract-details-modal/contract-details-modal.component';

@Component({
  selector: 'app-contracts-page',
  imports: [NgIf, AsyncPipe, ContractListComponent, ContractDetailsModalComponent],
  templateUrl: './contracts-page.component.html',
  styleUrl: './contracts-page.component.scss'
})
export class ContractsPageComponent implements OnInit {
  public contracts$!: Observable<ContractGetDto[]>;
  public selectedContractId: string | null = null;

  constructor(private readonly contractApi: ContractApi) { }
  ngOnInit(): void {
    this.loadContracts();
  }

  public onContractSelected(id: string): void {
    this.selectedContractId = id;
  }

  public onModalClosed(): void {
    this.selectedContractId = null;
    this.loadContracts();
  }

  private loadContracts(): void {
    this.contracts$ = this.contractApi.getAll();
  }
}
