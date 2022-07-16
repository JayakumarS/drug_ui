import { CompanyMaster } from './../../company-model';
import { CompanyMasterService } from './../../company-master.service';
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
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-list-debit-memo',
  templateUrl: './list-debit-memo.component.html',
  styleUrls: ['./list-debit-memo.component.sass']
})
export class ListDebitMemoComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  displayedColumns = [
    "companyName",
    "companyEmailID",
    "companyCity", 
    "companyState",
    "actions"
  ];
  companyList =[];
  debitMemoList =[];
  dataSource: ExampleDataSource | null;
  exampleDatabase: CompanyMasterService | null;
  selection = new SelectionModel<CompanyMaster>(true, []);
  index: number;
  id: number;
  companyMaster: CompanyMaster | null;
  debitMemoForm: FormGroup;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public companyMasterService: CompanyMasterService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
  ) {
    super();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.loadData();

    this.httpService.get<any>(this.companyMasterService.getCompanyMasterDropdownList).subscribe(
      (data) => {
        this.companyList = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
      );

      this.httpService.get<any>(this.companyMasterService.getdebitMemoDropdownList).subscribe(
        (data) => {
          this.debitMemoList = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
        }
        );

  }

  refresh(){
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new CompanyMasterService(this.httpClient,this.serverUrl,this.httpService);
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
    this.router.navigate(['/setup/companyMaster/addCompanyMaster/'+ row.companyCode]);
  }

  deleteItem(row){ 

  }


  returnMemo(){   
   let tempDirection;
   if (localStorage.getItem("isRtl") === "true") {
     tempDirection = "rtl";
   } else {
     tempDirection = "ltr";
   }
   const dialogRef = this.dialog.open(AddDebitMemoComponent, {
     height: "270px",
     width: "400px",
    // data: row,
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
  onContextMenu(event: MouseEvent, item: CompanyMaster) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<CompanyMaster> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: CompanyMaster[] = [];
  renderedData: CompanyMaster[] = [];
  constructor(
    public exampleDatabase: CompanyMasterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<CompanyMaster[]> {
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
          .filter((companyMaster: CompanyMaster) => {
            const searchStr = (
              companyMaster.companyName +
              companyMaster.companyEmailID +
              companyMaster.companyState +
              companyMaster.companyCity 
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
  sortData(data: CompanyMaster[]): CompanyMaster[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "companyName":
          [propertyA, propertyB] = [a.companyName, b.companyName];
          break;
        case "companyEmailID":
          [propertyA, propertyB] = [a.companyEmailID, b.companyEmailID];
          break;
        case "companyState":
          [propertyA, propertyB] = [a.companyState, b.companyState];
          break;
        case "companyCity":
          [propertyA, propertyB] = [a.companyCity, b.companyCity];
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