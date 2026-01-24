import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClientGetDto } from '../../models/client.dto';
import { NgIf, NgForOf, DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-list',
  imports: [NgIf, NgForOf, DatePipe],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
  @Input() public clients: ClientGetDto[] | null = null;
  @Output() public select = new EventEmitter<string>();

  public onSelect(id: string): void {
    this.select.emit(id);
  }
}
