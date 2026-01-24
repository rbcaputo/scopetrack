export interface DeliverablePostDto {
  title: string,
  description?: string,
  dueDate?: Date,
}

export interface DeliverablePatchDto {
  newStatus: "InProgress" | "Completed" | "Cancelled"
}

export interface DeliverableGetDto {
  id: string,
  contractId: string,
  title: string,
  description?: string,
  status: "Pending" | "InProgress" | "Completed" | "Cancelled",
  dueDate?: Date,
  createdAt: Date,
  updatedAt: Date
}
