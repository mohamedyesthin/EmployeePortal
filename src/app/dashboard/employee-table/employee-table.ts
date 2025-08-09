import { Component, ViewChildren, QueryList } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import * as XLSX from 'xlsx';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { saveAs } from 'file-saver';
import { allEmployees } from '../../employeedata';
@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.html',
  styleUrls: ['./employee-table.scss'],
  imports: [TableModule, TabsModule, InputTextModule, ButtonModule, IconFieldModule]
})
export class EmployeeTable {
  @ViewChildren('tableRef') tables: any;

  allEmployees = allEmployees
  activeTabIndex = 0;

  activeEmployees = this.allEmployees.filter(e => e.status === 'Active');
  archivedEmployees = this.allEmployees.filter(e => e.status === 'Archived');
  employeeTabs = [this.allEmployees, this.activeEmployees, this.archivedEmployees];

  // exportExcel(table: Table) {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(table.filteredValue || table.value);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'Employees': worksheet }, SheetNames: ['Employees'] };
  //   XLSX.writeFile(workbook, 'employees.xlsx');
  // }

  onColumnFilter(event: Event, field: string) {
    const value = (event.target as HTMLInputElement).value;
    this.tables.filter(value, field, 'contains');
  }
  onGlobalFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.tables.filterGlobal(inputValue, 'contains');
  }
  editEmployee(nam: any) {
    const employee = this.allEmployees.find(e => e.employeeName === nam);
    if (employee) {
      // employee.editCode = 1; // Set editCode to 1 for the employee being edited
    }

  }
  exportExcel(data: any[], fileName: string) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${fileName}.xlsx`);
  }
  getFileNameForTab(): string {
    switch (this.activeTabIndex) {
      case 0:
        return 'All_Employees';
      case 1:
        return 'Active_Employees';
      case 2:
        return 'Archived_Employees';
      default:
        return 'Employees';
    }
  }

}
