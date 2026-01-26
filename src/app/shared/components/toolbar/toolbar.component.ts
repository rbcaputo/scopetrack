import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolbarAction } from '../../interfaces/toolbar.interface';

@Component({
  selector: 'app-toolbar',
  imports: [NgIf, NgForOf],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() public actions: ToolbarAction[] = [];
  @Input() public showSearch = false;
  @Input() public searchPlaceholder = "Search";
  @Input() public searchTerm = "";
  @Output() public searchChange = new EventEmitter<string>();

  public onSearchChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}
