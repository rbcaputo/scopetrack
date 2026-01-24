import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../core/api/api.config';
import { HttpClient } from '@angular/common/http';
import { ContractGetDto, ContractPatchDto } from '../models/contract.dto';
import { Observable } from 'rxjs';
import { DeliverableGetDto, DeliverablePostDto } from '../../deliverables/models/deliverable.dto';

Injectable({ providedIn: "root" })
export class ContractApi {
  private readonly baseUrl = `${API_BASE_URL}/contracts`;

  constructor(private readonly http: HttpClient) { }

  public patchStatus(
    id: string,
    dto: ContractPatchDto
  ): Observable<ContractGetDto> {
    return this.http.patch<ContractGetDto>(
      `${this.baseUrl}/${id}`,
      dto
    )
  }

  public addDeliverable(
    id: string,
    dto: DeliverablePostDto
  ): Observable<DeliverableGetDto> {
    return this.http.post<DeliverableGetDto>(
      `${this.baseUrl}/${id}/contracts`,
      dto
    );
  }

  public getById(id: string): Observable<ContractGetDto> {
    return this.http.get<ContractGetDto>(`${this.baseUrl}/${id}`)
  }

  public getAll(): Observable<ContractGetDto[]> {
    return this.http.get<ContractGetDto[]>(this.baseUrl);
  }
}
