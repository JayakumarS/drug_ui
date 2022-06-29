 import { DeliveryNoteService } from '../../delivery-note.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-delivery-note',
  templateUrl: './delete-delivery-note.component.html',
  styleUrls: ['./delete-delivery-note.component.sass']
})
export class DeleteDeliveryNoteComponent implements OnInit {


  constructor( public dialogRef: MatDialogRef<DeleteDeliveryNoteComponent>,
 @Inject(MAT_DIALOG_DATA) public data: any,
 public deliveryNoteService: DeliveryNoteService,private snackBar: MatSnackBar,) { }
ngOnInit(): void {
 throw new Error('Method not implemented.');
}

 onNoClick(): void {
   this.dialogRef.close();
 }
 confirmDelete(): void {
   this.deliveryNoteService.deleteDeliveryNote(this.data.deliveryNo);
   this.showNotification(
     "snackbar-success",

     "Delete Record Successfully...!!!",
     "bottom",
     "center"
   );
 }

 showNotification(colorName, text, placementFrom, placementAlign) {
   this.snackBar.open(text, "", {
     duration: 2000,
     verticalPosition: placementFrom,
     horizontalPosition: placementAlign,
     panelClass: colorName,
   });
 }

}
