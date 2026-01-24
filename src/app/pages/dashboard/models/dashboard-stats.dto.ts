export interface DashboardStatsDto {
  clients: {
    total: number,
    active: number,
    inactive: number
  },
  contracts: {
    total: number,
    draft: number,
    active: number,
    completed: number,
    archived: number
  },
  deliverables: {
    total: number,
    pending: number,
    inProgress: number,
    completed: number,
    cancelled: number
  };
}
