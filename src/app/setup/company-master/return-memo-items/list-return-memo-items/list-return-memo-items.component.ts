import { ReturnMemoItems } from './../return-memo-items-model';
import { ReturnMemoItemsService } from './../return-memo-items.service';
import { AddReturnMemoItemsComponent } from './../add-return-memo-items/add-return-memo-items.component';
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
    "ndcupcCode",
    "quantity",
    "expDate", 
    "price",
    "actions"
  ];
  companyList =[];
  returnMemoItemsList =[];
  dataSource: ExampleDataSource | null;
  exampleDatabase: ReturnMemoItemsService | null;
  selection = new SelectionModel<ReturnMemoItems>(true, []);
  index: number;
  id: number;
  requestId: any;
  returnMemoItems: ReturnMemoItems | null;
  docForm: FormGroup;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public returnMemoItemsService: ReturnMemoItemsService,
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
      price: ["", [Validators.required]],
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


    

        this.loadData();
  }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new ReturnMemoItemsService(this.httpClient,this.serverUrl,this.httpService);
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

  returnMemoItemspage(row){ 
 
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
  onContextMenu(event: MouseEvent, item: ReturnMemoItems) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<ReturnMemoItems> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ReturnMemoItems[] = [];
  renderedData: ReturnMemoItems[] = [];
  constructor(
    public exampleDatabase: ReturnMemoItemsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ReturnMemoItems[]> {
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
          .filter((returnMemoItems: ReturnMemoItems) => {
            const searchStr = (
              returnMemoItems.ndcupcCode +
              returnMemoItems.quantity +
              returnMemoItems.price +
              returnMemoItems.expDate 
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
  sortData(data: ReturnMemoItems[]): ReturnMemoItems[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "ndcupcCode":
          [propertyA, propertyB] = [a.ndcupcCode, b.ndcupcCode];
          break;
        case "quantity":
          [propertyA, propertyB] = [a.quantity, b.quantity];
          break;
        case "price":
          [propertyA, propertyB] = [a.price, b.price];
          break;
        case "expDate":
          [propertyA, propertyB] = [a.expDate, b.expDate];
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