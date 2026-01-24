import { DashboardStatsDto } from '../models/dashboard-stats.dto';
import { Injectable } from "@angular/core";
import { ClientApi } from "../../../features/clients/api/client.api";
import { ContractApi } from "../../../features/contract/api/contract.api";
import { forkJoin, Observable, map } from 'rxjs';

@Injectable({ providedIn: "root" })
export class DashboardService {
  constructor(
    private readonly clientApi: ClientApi,
    private readonly contractApi: ContractApi
  ) { }

  public getStats(): Observable<DashboardStatsDto> {
    return forkJoin({
      clients: this.clientApi.getAll(),
      contracts: this.contractApi.getAll()
    }).pipe(
      map(({ clients, contracts}) => {
        const deliverables = contracts.flatMap(c => c.deliverables);

        return {
          clients: {
            total: clients.length,
            active: clients.filter(c => c.status === "Active").length,
            inactive: clients.filter(c => c.status === "Inactive").length
          },
          contracts: {
            total: contracts.length,
            draft: contracts.filter(c => c.status === "Draft").length,
            active: contracts.filter(c => c.status === "Active").length,
            completed: contracts.filter(c => c.status === "Completed").length,
            archived: contracts.filter(c => c.status === "Archived").length
          },
          deliverables: {
            total: deliverables.length,
            pending: deliverables.filter(d => d.status === "Pending").length,
            inProgress: deliverables.filter(d => d.status === "InProgress").length,
            completed: deliverables.filter(d => d.status === "Completed").length,
            cancelled: deliverables.filter(d => d.status === "Cancelled").length
          }
        };
      })
    );
  }
}
