import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeliverableGetDto } from '../../models/deliverable.dto';
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-deliverable-list',
  imports: [NgForOf],
  templateUrl: './deliverable-list.component.html',
  styleUrl: './deliverable-list.component.scss'
})
export class DeliverableListComponent {
  @Input() public deliverables: DeliverableGetDto[] = [];
  @Output() public select = new EventEmitter<string>();

  public onSelect(id: string): void {
    this.select.emit(id);
  }
}
