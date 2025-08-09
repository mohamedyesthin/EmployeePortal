import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-dynamicformbuilder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule, ToastModule],
  templateUrl: './dynamicformbuilder.html',
  styleUrls: ['./dynamicformbuilder.scss'],
  providers: [MessageService], // Important
})
export class Dynamicformbuilder {
  fieldTypes = [
    { type: 'text', label: 'Text Field', desc: 'Single line text input field' },
    { type: 'textarea', label: 'Textarea Field', desc: 'Multi-line text input area' },
    { type: 'email', label: 'Email Field', desc: 'Email address input with validation' },
    { type: 'number', label: 'Number Field', desc: 'Numeric input field' },
    { type: 'select', label: 'Select Field', desc: 'Dropdown selection menu' },
    { type: 'checkbox', label: 'Checkbox Field', desc: 'Multiple choice checkboxes' },
    { type: 'radio', label: 'Radio Field', desc: 'Single choice radio buttons' },
    { type: 'date', label: 'Date Field', desc: 'Form input field' },
  ];

  form: FormGroup;
  selectedFieldIndex: number | null = null;
  messageService = inject(MessageService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tabName: ['', Validators.required],
      tabType: [''],
      tabOrder: [0],
      fields: this.fb.array([])
    });
  }

  get fieldsArray(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  get selectedField(): FormGroup | null {
    return this.selectedFieldIndex !== null
      ? (this.fieldsArray.at(this.selectedFieldIndex) as FormGroup)
      : null;
  }

  private createFieldGroup(fieldType: any): FormGroup {
    const needsOptions = ['select', 'checkbox', 'radio'].includes(fieldType.type);
    return this.fb.group({
      type: [fieldType.type],
      label: [fieldType.label, Validators.required],
      name: [null, Validators.required],
      placeholder: [`Enter ${fieldType.label.toLowerCase().replace(' field', '')}...`],
      order: [this.fieldsArray.length],
      defaultValue: [''],
      tooltip: [''],
      required: [false],
      readonly: [false],
      options: this.fb.control([], needsOptions ? Validators.required : [])
    });
  }

  drop(event: any) {
    if (event.previousContainer === event.container) return;

    const draggedItem = event.previousContainer.data[event.previousIndex];
    this.fieldsArray.push(this.createFieldGroup(draggedItem));
    this.selectField(this.fieldsArray.length - 1);
  }

  selectField(index: number) {
    this.selectedFieldIndex = index;
  }

  removeField(index: number) {
    this.fieldsArray.removeAt(index);
    if (this.selectedFieldIndex === index) {
      this.selectedFieldIndex = null;
    }
  }

  onOptionsChange(event: any) {
    let value = event.target.value;
    if (this.selectedField) {
      this.selectedField.get('options')?.setValue(
        value.split(',').map((o: string) => o.trim())
      );
    }
  }

  saveTab() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields.'
      });
      return;
    }

    const allTabs = JSON.parse(localStorage.getItem('formTabs') || '[]');
    allTabs.push(this.form.value);
    localStorage.setItem('formTabs', JSON.stringify(allTabs));

    this.form.reset({ tabOrder: 0, fields: [] });
    this.fieldsArray.clear();
    this.selectedFieldIndex = null;

    this.messageService.add({
      severity: 'success',
      summary: 'Saved',
      detail: 'Tab has been saved successfully.'
    });
  }


  preview() {
    alert('Preview JSON:\n' + JSON.stringify(this.form.value, null, 2));
  }
}
