import { ContractGetDto } from '../../contract/models/contract.dto';

export interface ClientPostDto {
  name: string,
  email: string
}

export interface ClientPutDto {
  name: string,
  email: string
}

export interface ClientGetDto {
  id: string,
  name: string,
  email: string,
  status: "Active" | "Inactive",
  createdAt: Date,
  updatedAt: Date,
  contracts: ContractGetDto[]
}

export interface ClientErrorDto {
  code: string
  message: string
}

