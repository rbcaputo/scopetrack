import { DeliverableGetDto } from '../../deliverables/models/deliverable.dto';

export interface ContractPostDto {
  title: string,
  description?: string,
  type: string
}

export interface ContractPatchDto{
  newStatus: string
}

export interface ContractGetDto {
  id: string,
  clientId: string,
  title: string,
  description: string,
  type: string,
  status: "Draft" | "Active" | "Completed" | "Archived",
  createdAt: Date,
  updatedAt: Date,
  deliverables: DeliverableGetDto[]
}
