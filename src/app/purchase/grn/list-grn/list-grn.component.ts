import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
// import { ExampleDataSource } from 'src/app/admin/employees/allEmployees/allemployees.component';
import { EmployeesService } from 'src/app/admin/employees/allEmployees/employees.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { serverLocations } from 'src/app/auth/serverLocations';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { GrnService } from '../grn.service';
import { Grn } from '../grn.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseRequestService } from '../../purchase-request/purchase-request.service';

@Component({
  selector: 'app-list-grn',
  templateUrl: './list-grn.component.html',
  styleUrls: ['./list-grn.component.sass']
})
export class ListGrnComponent extends UnsubscribeOnDestroyAdapter implements OnInit {

  displayedColumns = ['grnCode', 'grnDate','vendorName','poNo','poRequisition','preparedBy','actions'];
  dataSource: ExampleDataSource | null;
  exampleDatabase: GrnService | null;
  selection = new SelectionModel<Grn>(true, []);
  index: number;
  id: number;
  grn: Grn  | null;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public grnService: GrnService,
    private snackBar: MatSnackBar,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService,
    public router: Router,
    public route: ActivatedRoute
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

    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }
    
  }
  refresh(){
    this.loadData();
  }
  public loadData() {
    this.exampleDatabase = new GrnService(this.httpClient, this.serverUrl, this.httpService);
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
  editCall(grnCode) { 
    this.router.navigate(['/purchase/grn/addGrn/'+grnCode]);
  }

deleteItem(i, row){

}
// context menu
onContextMenu(event: MouseEvent, item: Grn) {
  event.preventDefault();
  this.contextMenuPosition.x = event.clientX + "px";
  this.contextMenuPosition.y = event.clientY + "px";
  this.contextMenu.menuData = { item: item };
  this.contextMenu.menu.focusFirstItem("mouse");
  this.contextMenu.openMenu();
}
}
export class ExampleDataSource extends DataSource<Grn> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Grn[] = [];
  renderedData: Grn[] = [];
  constructor(
    public exampleDatabase: GrnService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Grn[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllList();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((currencyMaster: Grn) => {
            const searchStr = (
              currencyMaster.grnCode +
              currencyMaster.grnDate +
              currencyMaster.vendorName +
              currencyMaster.poNo +
              currencyMaster.poRequisition +
              currencyMaster.preparedBy              
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
  sortData(data: Grn[]): Grn[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "grnCode":
          [propertyA, propertyB] = [a.grnCode, b.grnCode];
          break;
        case "grnDate":
          [propertyA, propertyB] = [a.grnDate, b.grnDate];
          break;
        
        case "vendorName":
          [propertyA, propertyB] = [a.vendorName, b.vendorName];
          break;
          
        case "poRequisition":
          [propertyA, propertyB] = [a.poRequisition, b.poRequisition];
          break;

          case "preparedBy":
            [propertyA, propertyB] = [a.preparedBy, b.preparedBy];
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



