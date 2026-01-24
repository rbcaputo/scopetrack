import { Component, OnInit } from '@angular/core';
import { ContractGetDto } from '../../../models/contract.dto';
import { Observable } from 'rxjs';
import { ContractApi } from '../../../api/contract.api';
import { ContractListComponent } from "../../../components/contract-list/contract-list.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-contracts-page',
  imports: [AsyncPipe, ContractListComponent],
  templateUrl: './contracts-page.component.html',
  styleUrl: './contracts-page.component.scss'
})
export class ContractsPageComponent implements OnInit {
  public contracts$!: Observable<ContractGetDto[]>;
  public selectedContractId: string | null = null;

  constructor(private readonly contractApi: ContractApi) { }

  ngOnInit(): void {
    this.contracts$ = this.contractApi.getAll();
  }

  public onContractSelected(id: string): void {
    this.selectedContractId = id;
  }

  public onModalClosed(): void {
    this.selectedContractId = null;
  }
}
