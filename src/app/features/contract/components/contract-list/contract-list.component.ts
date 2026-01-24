import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContractGetDto } from '../../models/contract.dto';

@Component({
  selector: 'app-contract-list',
  imports: [],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.scss'
})
export class ContractListComponent {
  @Input() public contracts: ContractGetDto[] | null = null;
  @Output() public select = new EventEmitter<string>();

  public onSelect(id: string): void {
    this.select.emit(id);
  }
}
