import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../../../core/api/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientGetDto, ClientPostDto, ClientPutDto } from '../models/client.dto';
import { ContractGetDto, ContractPostDto } from '../../contract/models/contract.dto';

@Injectable({ providedIn: "root" })
export class ClientApi {
  private readonly baseUrl = `${API_BASE_URL}/clients`;

  constructor(private readonly http: HttpClient) { }

  public post(dto: ClientPostDto): Observable<ClientGetDto> {
    return this.http.post<ClientGetDto>(this.baseUrl, dto);
  }

  public put(
    id: string,
    dto: ClientPutDto
  ): Observable<ClientGetDto> {
    return this.http.put<ClientGetDto>(
      `${this.baseUrl}/${id}`,
      dto
    );
  }

  public toggleStatus(id: string): Observable<ClientGetDto> {
    return this.http.post<ClientGetDto>(
      `${this.baseUrl}/${id}/toggle-status`,
      null
    );
  }

  public addContract(
    id: string,
    dto: ContractPostDto
  ): Observable<ContractGetDto> {
    return this.http.post<ContractGetDto>(
      `${this.baseUrl}/${id}/contracts`,
      dto
    );
  }

  public getById(id: string): Observable<ClientGetDto> {
    return this.http.get<ClientGetDto>(`${this.baseUrl}/${id}`);
  }

  public getAll(): Observable<ClientGetDto[]> {
    return this.http.get<ClientGetDto[]>(this.baseUrl);
  }
}
