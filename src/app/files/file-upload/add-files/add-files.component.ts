import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../file-upload.service';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FileUploadMaster } from '../file-upload.model';
import { FileUploadResultBean} from '../file-upload-result-bean';


@Component({
  selector: 'app-add-files',
  templateUrl: './add-files.component.html',
  styleUrls: ['./add-files.component.sass']
})
export class AddFilesComponent implements OnInit {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  dataarray=[];
  customerList = [];
  cusMasterData =[];
  fileUploadMaster:FileUploadMaster;
  @ViewChild('myFile') myInputVariable: ElementRef;
  files: any = [];
  requestId: number;
  edit: boolean=false;
  constructor(private fb: FormBuilder,private authService: AuthService,public router: Router,
    private fileUploadService:FileUploadService,private httpService: HttpServiceService
    ,private snackBar: MatSnackBar,public route: ActivatedRoute) {
    this.docForm = this.fb.group({
      companyCode: ["", [Validators.required]],
      uploadFile: [""],
      reportUrl:[""]
    });
  }
  ngOnInit(): void {
   
   // customer dropdown 
   this.httpService.get<FileUploadResultBean>(this.fileUploadService.customerList).subscribe(
    (data) => {
      console.log(data);
      this.customerList = data.customerList;
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + " " + error.message);
    }
  );
   
    this.route.params.subscribe(params => {
      if(params.id!=undefined && params.id!=0){
       this.requestId = params.id;
       this.edit=true;
       //For User login Editable mode
       this.fetchDetails(this.requestId) ;
      }
     });


     
  }
  onSubmit() {
    this.fileUploadMaster = this.docForm.value;
    console.log(this.fileUploadMaster);
    this.fileUploadService.addCustomerMaster(this.fileUploadMaster);
    this.showNotification(
      "snackbar-success",
      "Record Added.",
      "bottom",
      "center"
    );
    this.router.navigate(['/files/fileUpload/listFiles']);
  }

  fetchDetails(cusCode: any): void {
    this.httpService.get(this.fileUploadService.editCustomermaster+"?customer="+cusCode).subscribe((res: any)=> {
      console.log(cusCode);

      this.docForm.patchValue({
        'companyCode': res.customerMasterBean.companyCode,
        'reportUrl': res.customerMasterBean.reportUrl
     })
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }

  update(){

    this.fileUploadMaster = this.docForm.value;
    this.fileUploadService.customerMasterUpdate(this.fileUploadMaster);
    this.showNotification(
      "snackbar-success",
      "Edit Record Successfully...!!!",
      "bottom",
      "center"
    );
    this.router.navigate(['/crm/customerMaster/listCustomer']);

  }

  reset(){}
  removeRow(index){
    this.dataarray.splice(index, 1);
  }
  onCancel(){
    this.router.navigate(['/files/fileUpload/listFiles']);
   }

   showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }


  // File upload
getFileDetails(event) {
  var docfile = event.target.files[0];
  var fileExtension = docfile.name;
  var frmData: FormData = new FormData();
  frmData.append("file", docfile);
  frmData.append("fileName",fileExtension);
  console.log(frmData);
  
  // var data = this.httpService.postData(this.fileUploadService.addFiles,frmData);
  // console.log(data);
  
  this.httpService.post<any>(this.fileUploadService.addFiles, frmData).subscribe(data => {
      console.log(data);
      if(data.success){
        this.docForm.patchValue({
          'reportUrl': data.filePath     
         
       })
      }else{
        this.showNotification(
          "snackbar-success",
          data.message,
          "bottom",
          "center"
        );
      }
      
      },
      (err: HttpErrorResponse) => {
        
    });

  }


  removed(id) {
    console.log(this.files);
    this.files.splice(id, 1);
    console.log(this.files);
  }
}
