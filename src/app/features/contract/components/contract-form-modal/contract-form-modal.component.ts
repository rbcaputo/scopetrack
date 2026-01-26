import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContractGetDto, ContractPostDto } from '../../models/contract.dto';
import { ClientApi } from '../../../clients/api/client.api';

@Component({
  selector: 'app-contract-form-modal',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './contract-form-modal.component.html',
  styleUrl: './contract-form-modal.component.scss'
})
export class ContractFormModalComponent implements OnInit {
  @Input() public clientId!: string;
  @Output() public close = new EventEmitter<void>();
  @Output() public saved = new EventEmitter<ContractGetDto>();

  public form!: FormGroup;
  public isSubmitting = false;
  public error: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly clientApi: ClientApi
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      title: ["", Validators.required, [Validators.minLength(5), Validators.maxLength(200)]],
      description: ["", Validators.maxLength(1000)],
      type: ["", Validators.required]
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const dto: ContractPostDto = this.form.value;

    this.clientApi.addContract(this.clientId, dto).subscribe({
      next: (result) => {
        this.isSubmitting = false;
        this.saved.emit(result);
      },
      error: (er) => {
        this.isSubmitting = false;
        this.error = er.error?.message || "Failed to add contract";
      }
    });
  }

  public onClose(): void {
    this.close.emit();
  }
}
