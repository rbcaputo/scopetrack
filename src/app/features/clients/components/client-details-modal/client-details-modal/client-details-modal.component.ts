import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientGetDto } from '../../../models/client.dto';
import { ClientApi } from '../../../api/client.api';
import { AsyncPipe, NgIf } from "../../../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";

@Component({
  selector: 'app-client-details-modal',
  imports: [NgIf, AsyncPipe],
  templateUrl: './client-details-modal.component.html',
  styleUrl: './client-details-modal.component.scss'
})
export class ClientDetailsModalComponent implements OnChanges {
  @Input() public clientId!: string;
  @Output() public close = new EventEmitter<void>();

  public client$!: Observable<ClientGetDto>;

  constructor(private readonly clientApi: ClientApi) { }

  ngOnChanges(): void {
    this.client$ = this.clientApi.getById(this.clientId);
  }

  public onClose(): void {
    this.close.emit();
  }
}
