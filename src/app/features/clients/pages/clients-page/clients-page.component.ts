import { ClientGetDto } from './../../models/client.dto';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ClientApi } from '../../api/client.api';
import { AsyncPipe, NgIf } from '@angular/common';
import { ClientListComponent } from "../../components/client-list/client-list.component";
import { ClientDetailsModalComponent } from '../../components/client-details-modal/client-details-modal/client-details-modal.component';
import { ClientFormModalComponent } from '../../components/client-form-modal/client-form-modal.component';
import { ToolbarComponent } from '../../../../shared/components/toolbar/toolbar.component';
import { ToolbarAction } from '../../../../shared/interfaces/toolbar.interface';

@Component({
  selector: 'app-clients-page',
  imports: [
    NgIf,
    AsyncPipe,
    ClientListComponent,
    ClientDetailsModalComponent,
    ClientFormModalComponent,
    ToolbarComponent
  ],
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.scss'
})
export class ClientsPageComponent implements OnInit {
  public clients$!: Observable<ClientGetDto[]>;
  public filteredClients$!: Observable<ClientGetDto[]>;
  public selectedClientId: string | null = null;
  public showCreateForm = false;
  public searchTerm = "";
  public toolbarActions: ToolbarAction[] = [];

  private serachTerm$ = new BehaviorSubject<string>("");

  constructor(private readonly clientApi: ClientApi) { }
  ngOnInit(): void {
    this.loadClients();
    this.setupToolbar();
    this.setupSearch();
  }

  public onSearchChange(term: string): void {
    this.searchTerm = term;
    this.serachTerm$.next(term);
  }

  public onClientSelected(id: string): void {
    this.selectedClientId = id;
  }

  public onClientCreated(): void {
    this.showCreateForm = false;
    this.loadClients();
  }

  public onModalClosed(): void {
    this.selectedClientId = null;
    this.loadClients();
  }

  private setupToolbar(): void {
    this.toolbarActions = [
      {
        label: "Add Client",
        primary: true,
        onClick: () => this.showCreateForm = true
      }
    ];
  }

  private setupSearch(): void {
    this.filteredClients$ = combineLatest([
      this.clients$,
      this.serachTerm$,
    ]).pipe(
      map(([clients, term]) => {
        if (!term.trim())
          return clients;

        const searchLower = term.toLowerCase();
        return clients.filter(client =>
          client.name.toLowerCase().includes(searchLower) ||
          client.email.toLowerCase().includes(searchLower)
        );
      })
    );
  }

  private loadClients(): void {
    this.clients$ = this.clientApi.getAll();
  }
}
