import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../core/api/api.config';
import { HttpClient } from '@angular/common/http';
import { DeliverableGetDto, DeliverablePatchDto } from '../models/deliverable.dto';
import { Observable } from 'rxjs';

Injectable({ providedIn: "root"})
export class DeliverableApi {
  private readonly baseUrl = `${API_BASE_URL}/deliverables`;

  constructor(private readonly http: HttpClient) { }

  public patchStatus(
    id: string,
    dto: DeliverablePatchDto
  ): Observable<DeliverableGetDto> {
    return this.http.patch<DeliverableGetDto>(
      `${this.baseUrl}/${id}`,
      dto
    )
  }

  public getById(id: string): Observable<DeliverableGetDto> {
    return this.http.get<DeliverableGetDto>(`${this.baseUrl}/${id}`);
  }
}
