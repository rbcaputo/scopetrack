import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientGetDto, ClientPostDto, ClientPutDto } from '../../models/client.dto';
import { ClientApi } from '../../api/client.api';

@Component({
  selector: 'app-client-form-modal',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './client-form-modal.component.html',
  styleUrl: './client-form-modal.component.scss'
})
export class ClientFormModalComponent implements OnInit {
  @Input() public client?: ClientGetDto;
  @Output() public close = new EventEmitter<void>();
  @Output() public saved = new EventEmitter<ClientGetDto>();

  public form!: FormGroup;
  public isSubmitting = false;
  public error: string | null = null;

  public get isEditMode(): boolean {
    return !!this.client;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly clientApi: ClientApi
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.client?.name || "", Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      email: [this.client?.email || "", [Validators.required, Validators.email]]
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    if (this.isEditMode) {
      const dto: ClientPutDto = this.form.value;

      this.clientApi.put(this.client!.id, dto).subscribe({
        next: (result) => {
          this.isSubmitting = false;
          this.saved.emit(result);
        },
        error: (er) => {
          this.isSubmitting = false;
          this.error = er.error?.message || "Failed to update client";
        }
      });
    } else {
      const dto: ClientPostDto = this.form.value;

      this.clientApi.post(dto).subscribe({
        next: (result) => {
          this.isSubmitting = false;
          this.saved.emit(result);
        },
        error: (er) => {
          this.isSubmitting = false;
          this.error = er.error?.mesaage || "Failed to create client";
        }
      });
    }
  }

  public onClose(): void {
    this.close.emit();
  }
}
