import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Claim } from './claims.model';
import { ClaimsService } from './claims.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit, OnDestroy {
  claims: Claim[] = [];
  claimCount: number = 0;
  claimsLoading = true;
  allClaimStatus: string[] = [];
  currentPage: number = 1;
  totalPage: number = 0;
  fileName= 'ExcelSheet.xlsx';

  claimsSub?: Subscription;
  claimsCountSub?: Subscription;

  validateForm!: FormGroup;




  constructor(
    private claimsService: ClaimsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      referenceNumber: [null],
      courtReferenceNumber: [null],
      status: [null],
      firstName: [null],
      lastName: [null],
    });

    this.pageChanged(1);
    this.claimsService.getAllStatus().subscribe(res => this.allClaimStatus = res.result);
    this.claimsSub = this.claimsService.claims.subscribe(res => this.claims = res);
    this.claimsCountSub = this.claimsService.claimCount.subscribe( res=> this.claimCount = res);
  }


  pageChanged(page: number){
    this.currentPage = page;
    this.claimsLoading = true;
    this.claimsService.fetchClaims({page, ...this.validateForm?.value}).subscribe(()=> this.claimsLoading = false);
  }

  search(){
    console.log(this.validateForm.value)
    this.pageChanged(1);
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.querySelectorAll('.ant-table-fixed')[0];

    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

  ngOnDestroy(): void {
    this.claimsSub?.unsubscribe();
    this.claimsCountSub?.unsubscribe();
  }

}
