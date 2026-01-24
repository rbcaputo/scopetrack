import { ClientGetDto } from './../../models/client.dto';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientApi } from '../../api/client.api';
import { AsyncPipe, NgIf } from '@angular/common';
import { ClientListComponent } from "../../components/client-list/client-list.component";
import { ClientDetailsModalComponent } from "../../components/client-details-modal/client-details-modal/client-details-modal.component";

@Component({
  selector: 'app-clients-page',
  imports: [NgIf, AsyncPipe, ClientListComponent, ClientDetailsModalComponent],
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.scss'
})
export class ClientsPageComponent implements OnInit {
  public clients$!: Observable<ClientGetDto[]>;
  public selectedClientId: string | null = null;

  constructor(private readonly clientApi: ClientApi) { }

  ngOnInit(): void {
    this.clients$ = this.clientApi.getAll();
  }

  public onClientSelected(id: string): void {
    this.selectedClientId = id;
  }

  public onModalClosed(): void {
    this.selectedClientId = null;
  }
}
