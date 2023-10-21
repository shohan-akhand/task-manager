import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  @Input() taskNo: number | null = null;
  @Output() confirm = new EventEmitter<boolean>();
 
  agree() {
   this.confirm.emit(true);
   this.taskNo = null;
  }
  disagree() {
   this.confirm.emit(false);
   this.taskNo = null;
  }

}
