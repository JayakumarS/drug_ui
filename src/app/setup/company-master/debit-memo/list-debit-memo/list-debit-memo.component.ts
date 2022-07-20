import { DeleteDebitMemoComponent } from './delete-debit-memo/delete-debit-memo.component';
import { DebitMemo } from './../debitmemo-model';
import { DebitmemoService } from './../debitmemo.service';
import { AddDebitMemoComponent } from './../add-debit-memo/add-debit-memo.component';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/collections";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CommonService } from 'src/app/common-service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-list-debit-memo',
  templateUrl: './list-debit-memo.component.html',
  styleUrls: ['./list-debit-memo.component.sass']
})
export class ListDebitMemoComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "company",
    "returnMemoDate",
    "returnMemoName", 
    "returnMemoNo",
    "actions"
  ];
  companyList =[];
  debitMemoList =[];
  listDebitMemo =[];
  
  exampleDatabase: DebitmemoService | null;
  selection = new SelectionModel<DebitMemo>(true, []);
  index: number;
  id: number;
  requestId: any;
  debitMemo: DebitMemo | null;
  docForm: FormGroup;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public debitmemoService: DebitmemoService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    public commonService: CommonService,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {
    super();
    this.docForm = this.fb.group({
      company: [""],
      returnMemoNo: [""],
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
      }
     });


    this.httpService.get<any>(this.commonService.getcompanyMasterDropdownList).subscribe(
      (data) => {
        this.companyList = data;
        this.docForm.patchValue({
          'company' : this.requestId,
       })

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

      

        setTimeout(() => {
        this.debitMemoDropdownList(this.requestId);
        this.searchData();
      }, 700);
  }



  debitMemoDropdownList(companyId){
  this.httpService.get<any>(this.commonService.getdebitMemoDropdownList+"?companyId="+companyId).subscribe(
    (data) => {
      this.debitMemoList = data;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
    );
  }

  searchData(){
    this.httpService.post<any>(this.debitmemoService.getAllMasters, this.docForm.value).subscribe(
      (data) => {
        this.listDebitMemo= data.listDebitMemo;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }


  returnMemoItems(row){
    this.router.navigate(['/setup/returnMemoItems/listReturnMemoItems/'+ row.company]);

  }


 

  editCall(row) {
     
   let tempDirection;
   if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }

   const obj={
    company: this.requestId,
    returnMemoDate: row.returnMemoDate,
    returnMemoName: row.returnMemoName,
    returnMemoNo: row.returnMemoNo,
    type:'Edit'
  }

   const dialogRef = this.dialog.open(AddDebitMemoComponent, {
     height: "80%",
     width: "80%",
     data: obj,
     direction: tempDirection,
   });
   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     
     
       this.showNotification(
         "snackbar-success",
         "Record Saved Successfully...!!!",
         "bottom",
         "center"
       );
       this.debitMemoDropdownList(this.requestId);
       this.searchData();
       
   });
  }

  deleteItem(row){  
    this.id = row.ndcupc;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteDebitMemoComponent, {
      height: "270px",
      width: "400px",
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
      
      this.searchData();
        this.showNotification(
          "snackbar-success",
          "Delete Record Successfully...!!!",
          "bottom",
          "center"
        );
      
      // else{
      //   this.showNotification(
      //     "snackbar-danger",
      //     "Error in Delete....",
      //     "bottom",
      //     "center"
      //   );
      // }
    });

 

  }





  addreturnMemo(){   
   let tempDirection;
   if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
   const obj={
    company:this.requestId,
    type:'Add'
  }

   const dialogRef = this.dialog.open(AddDebitMemoComponent, {
    
     height: "80%",
     width: "80%",
     data: obj,
     direction: tempDirection,
   });
   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     
     this.searchData();
       this.showNotification(
         "snackbar-success",
         "Record Saved Successfully...!!!",
         "bottom",
         "center"
       );
     
   });


  }



  
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

// context menu
  onContextMenu(event: MouseEvent, item: DebitMemo) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
