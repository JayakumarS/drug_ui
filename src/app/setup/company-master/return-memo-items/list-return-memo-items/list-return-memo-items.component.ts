import { DeleteReturnMemoItemsComponent } from './delete-return-memo-items/delete-return-memo-items.component';
import { ReturnMemoItems } from './../return-memo-items-model';
import { ReturnMemoItemsService } from './../return-memo-items.service';
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
import { AddReturnMemoItemsComponent } from './../add-return-memo-items/add-return-memo-items.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-list-return-memo-items',
  templateUrl: './list-return-memo-items.component.html',
  styleUrls: ['./list-return-memo-items.component.sass']
})
export class ListReturnMemoItemsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "ndcupcCode",
    "quantity",
    "price", 
    "expDate",
    "actions"
  ];

  listReturnMemoItems =[];
  exampleDatabase: ReturnMemoItemsService | null;
  selection = new SelectionModel<ReturnMemoItems>(true, []);
  index: number;
  id: number;
  requestId:any;
  docForm: FormGroup;
  returnMemoItems: ReturnMemoItems | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public returnMemoItemsService: ReturnMemoItemsService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService
  ) {
    super();
    this.docForm = this.fb.group({
      returnMemoNo: [""],
      ndcupcCode: [""],
    	lotNo: [""],
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.docForm.patchValue({
        'returnMemoNo' : this.requestId,
     })
       
      }
     });
     setTimeout(() => {
      this.searchData();
    }, 700);
  }

  searchData(){
    this.httpService.post<any>(this.returnMemoItemsService.getAllMasters, this.docForm.value).subscribe(
      (data) => {
      //  this.listReturnMemoItems= data.listReturnMemoItems;
      this.POSTS = data.listReturnMemoItems;

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );
  }

  reset(){
    this.docForm.patchValue({
      'ndcupcCode' :  '',
      'lotNo' : ''
   })
   this.searchData();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.searchData();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.searchData();
  }
  

  editCall(row) {
   
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const obj={
      returnMemoNo: row.returnMemoNo,
      returnMemoItemsCode: row.returnMemoItemsCode,
      ndcupcCode: row.ndcupcCode,
      type:'Edit'
    }
    const dialogRef = this.dialog.open(AddReturnMemoItemsComponent, {
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

  deleteItem(row){ 
    this.id = row.returnMemoItemsCode;
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(DeleteReturnMemoItemsComponent, {
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
    });

  }


  returnMemopage(row){
    this.router.navigate(['/setup/debitMemo/listDebitMemo/'+ row.companyCode]);

  }


  returnMemo(){   
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const obj={
      type:'Add',
      returnMemoNo: this.docForm.value.returnMemoNo
    }
    
    const dialogRef = this.dialog.open(AddReturnMemoItemsComponent, {
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
  onContextMenu(event: MouseEvent, item: ReturnMemoItems) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}
