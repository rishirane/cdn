import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material';


let totInvAmt :amountDetails[];

export interface amountDetails {
  id:string;
  invAmt: number;
}

export interface InvoiceDetails {
  id:string;
  manufacturer: string;
  po_No: string;
  invAmt: number;
  advAmt: number;
  financedAmt: number;
  avlLimit: number;
  financeAmount: number;
}

const ELEMENT_DATA: InvoiceDetails[] = [
  { id: '7sks2', po_No: 'PO1541154273996', manufacturer: 'MRF', invAmt: 10079, advAmt: 3231, financedAmt: 0, avlLimit: 3231, financeAmount: 3231},
  { id: '4oid4', po_No: 'PO9324847272723', manufacturer: 'Tata', invAmt: 40026, advAmt: 32533, financedAmt: 0, avlLimit: 32533, financeAmount: 32533 },
  { id: '9edf0', po_No: 'PO9034987323408', manufacturer: 'Maruti', invAmt: 69411, advAmt: 4322, financedAmt: 0, avlLimit: 4322, financeAmount: 4322 },
  { id: '8zxc3', po_No: 'PO0888778126885', manufacturer: 'Yamaha', invAmt: 90122, advAmt: 32131, financedAmt: 0, avlLimit: 32131, financeAmount: 32131 }
];

/**
 * @title Table with selection
 */
@Component({
  selector: 'invoice-details-table',
  styleUrls: ['table-selection-example.css'],
  templateUrl: 'table-selection-example.html',
})
export class InvoiceDetailsTable {
  displayedColumns: string[] = [ 'manufacturer', 'invAmt', 'advAmt', 'financedAmt', 'avlLimit', 'financeAmount', 'select'];
  myDataArray = new MatTableDataSource<InvoiceDetails>(ELEMENT_DATA);
  selection = new SelectionModel<InvoiceDetails>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.myDataArray.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.myDataArray.data.forEach(row => this.selection.select(row));
  }

  onCheckboxChange(event,row) {
    let total: number[] = [];
    if(event.checked){
      var pushable = {'id':row.id, 'invAmt':row.invAmt}
      totInvAmt.push(pushable);
    }
    
    // for (var i = 0; i < total.length; i++) {
    //   totInvAmt = total[i] + totInvAmt;
    // }

    console.log("row",row);
    console.log(totInvAmt)
  }
}
