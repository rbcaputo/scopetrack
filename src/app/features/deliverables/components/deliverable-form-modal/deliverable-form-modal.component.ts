import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeliverableGetDto, DeliverablePostDto } from '../../models/deliverable.dto';
import { ContractApi } from '../../../contract/api/contract.api';

@Component({
  selector: 'app-deliverable-form-modal',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './deliverable-form-modal.component.html',
  styleUrl: './deliverable-form-modal.component.scss'
})
export class DeliverableFormModalComponent implements OnInit {
  @Input() public contractId!: string;
  @Output() public close = new EventEmitter<void>();
  @Output() public saved = new EventEmitter<DeliverableGetDto>();

  public form!: FormGroup;
  public isSubmitting = false;
  public error: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly contractApi: ContractApi
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      description: ["", [Validators.maxLength(1000)]],
      dueDate: [""]
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const dto: DeliverablePostDto = this.form.value;

    this.contractApi.addDeliverable(this.contractId, dto).subscribe({
      next: (result) => {
        this.isSubmitting = false;
        this.saved.emit(result);
      },
      error: (er) => {
        this.isSubmitting = false;
        this.error = er.error?.message || "Failed to add deliverable";
      }
    });
  }

  public onClose(): void {
    this.close.emit();
  }
}
