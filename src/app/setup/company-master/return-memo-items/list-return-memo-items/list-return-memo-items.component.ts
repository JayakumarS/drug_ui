import { AddReturnMemoItemsComponent } from './../add-return-memo-items/add-return-memo-items.component';
import { DebitmemoService } from './../../debit-memo/debitmemo.service';
import { DebitMemo } from './../../debit-memo/debitmemo-model';
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
  selector: 'app-list-return-memo-items',
  templateUrl: './list-return-memo-items.component.html',
  styleUrls: ['./list-return-memo-items.component.sass']
})
export class ListReturnMemoItemsComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "company",
    "returnMemoDate",
    "returnMemoName", 
    "returnMemoNo",
    "actions"
  ];
  companyList =[];
  debitMemoList =[];
  dataSource: ExampleDataSource | null;
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
      company: ["", [Validators.required]],
      returnMemoNo: ["", [Validators.required]],
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

      this.httpService.get<any>(this.commonService.getdebitMemoDropdownList).subscribe(
        (data) => {
          this.debitMemoList = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );


        this.loadData();
  }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new DebitmemoService(this.httpClient,this.serverUrl,this.httpService);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }


  editCall(row) {
     
   let tempDirection;
   if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
   const dialogRef = this.dialog.open(AddReturnMemoItemsComponent, {
     height: "80%",
     width: "80%",
     data: this.requestId,
     direction: tempDirection,
   });
   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     
     this.loadData();
       this.showNotification(
         "snackbar-success",
         "Record Saved Successfully...!!!",
         "bottom",
         "center"
       );
     
   });
  }

  deleteItem(row){ 

  }

  returnMemoItems(row){ 
 
    this.router.navigate(['/setup/returnMemoItems/listReturnMemoItems/'+ row.company]);

  }



  returnMemo(){   
   let tempDirection;
   if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
   const dialogRef = this.dialog.open(AddReturnMemoItemsComponent, {
     height: "80%",
     width: "80%",
     data: this.requestId,
     direction: tempDirection,
   });
   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
     
     this.loadData();
       this.showNotification(
         "snackbar-success",
         "Record Saved Successfully...!!!",
         "bottom",
         "center"
       );
     
   });


  }

  onOk() {
    
  }

  

  // calculator(){

  //   const dialogRef = this.dialog.open(CalculatorCustomerComponent, {
  //     height: "430px",
  //     width: "390px",
  
  //   });
  //   this.subs.sink = dialogRef.afterClosed().subscribe((data) => {
  
  //   });
    
  // }

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

export class ExampleDataSource extends DataSource<DebitMemo> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: DebitMemo[] = [];
  renderedData: DebitMemo[] = [];
  constructor(
    public exampleDatabase: DebitmemoService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DebitMemo[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllCompany();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((debitMemo: DebitMemo) => {
            const searchStr = (
              debitMemo.company +
              debitMemo.returnMemoDate +
              debitMemo.returnMemoNo +
              debitMemo.returnMemoName 
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {}
  /** Returns a sorted copy of the database data. */
  sortData(data: DebitMemo[]): DebitMemo[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "company":
          [propertyA, propertyB] = [a.company, b.company];
          break;
        case "returnMemoDate":
          [propertyA, propertyB] = [a.returnMemoDate, b.returnMemoDate];
          break;
        case "returnMemoNo":
          [propertyA, propertyB] = [a.returnMemoNo, b.returnMemoNo];
          break;
        case "returnMemoName":
          [propertyA, propertyB] = [a.returnMemoName, b.returnMemoName];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}