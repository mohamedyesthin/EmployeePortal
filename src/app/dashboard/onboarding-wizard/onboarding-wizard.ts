import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { Router } from '@angular/router';

interface Field {
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  tooltip?: string;
  options?: string[];
  name?: string;
}

interface Tab {
  tabName: string;
  fields: Field[];
}

@Component({
  selector: 'app-wizard-ui',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TabsModule,
    SelectModule,
    DatePickerModule,
    ToggleSwitchModule,
    InputTextModule,
    ButtonModule,
    TextareaModule,
    CheckboxModule,
    RadioButton
  ],
  templateUrl: './onboarding-wizard.html',
})
export class Wizard implements OnInit {
  tabs: Tab[] = [];
  form!: FormGroup;
  activeTabIndex = 0;
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit() {
    const storedTabs = localStorage.getItem('formTabs');

    if (storedTabs && JSON.parse(storedTabs).length > 0) {
      this.tabs = JSON.parse(storedTabs);
    } else {
      // Default data when no saved tabs exist
      this.tabs = [
        {
          tabName: 'Default Tab',
          fields: [
            {
              type: 'text',
              label: 'Full Name',
              name: 'fullName',
              placeholder: 'Enter your name',
              required: true
            },
            {
              type: 'email',
              label: 'Email',
              name: 'email',
              placeholder: 'Enter your email',
              required: true
            },
            {
              type: 'select',
              label: 'Country',
              name: 'country',
              options: ['India', 'USA', 'UK'],
              required: true
            }
          ]
        }
      ];
    }

    this.buildForm();

  }

  buildForm() {
    this.form = this.fb.group({
      tabs: this.fb.array(this.tabs.map((tab: any) =>
        this.fb.group({
          tabName: [tab.tabName, Validators.required],
          tabType: [tab.tabType || ''],
          tabOrder: [tab.tabOrder || 0],
          fields: this.fb.array(tab.fields.map((field: any) => this.createFieldGroup(field)))
        })
      ))
    });
  }

  createFieldGroup(field: Field): FormGroup {
    let validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }

    // Special validation for checkbox/select/radio options
    if (['checkbox', 'select', 'radio'].includes(field.type) && (!field.options || field.options.length === 0)) {
      validators.push(Validators.minLength(1));
    }

    return this.fb.group({
      type: [field.type],
      label: [field.label],
      name: [field.name, Validators.required],
      placeholder: [field.placeholder || ''],
      required: [field.required || false],
      readonly: [field.readonly || false],
      tooltip: [field.tooltip || ''],
      options: [field.options || []],
      value: ['', validators]
    });
  }

  get activeTab(): FormGroup {
    return (this.form.get('tabs') as FormArray).at(this.activeTabIndex) as FormGroup;
  }

  get activeFields(): FormArray {
    return this.activeTab.get('fields') as FormArray;
  }

  prepareOptions(options?: string[]) {
    return options ? options.map(o => ({ label: o, value: o })) : [];
  }

  onUpdate() {
    this.router.navigate(['/layout/dashboard']);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Form Submitted:', this.form.value);
    alert('Form submitted!');
  }
}
