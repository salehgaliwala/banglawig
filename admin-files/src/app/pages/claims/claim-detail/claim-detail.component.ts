import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Claim } from '../claims.model';
import { ClaimsService } from '../claims.service';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.scss']
})
export class ClaimDetailComponent implements OnInit, OnDestroy {
  claimId: number = 0;
  claim?: Claim;
  claimSub?: Subscription;
  allClaimStatus: string[] = [];

  claimRetryCounter: number = 0;
  claimLoading: boolean = true;
  claimNotFound: boolean = false;

  claimControls: any[] = [];
  claimsDetailControls: any[] = [];

  updateForm?: FormGroup;

  constructor(
    private router: ActivatedRoute,
    private claimsService: ClaimsService,
	private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(param => this.claimId = +param['id']);
    this.getSingleClaim();
  }

  getSingleClaim() {
	this.claimsService.getAllStatus().subscribe(statusRes => this.allClaimStatus = statusRes.result)
      this.claimSub = this.claimsService.claims.subscribe(claims => {
        if(claims.length === 0 && this.claimRetryCounter === 0) {

          this.claimRetryCounter++;
          this.claimLoading = true;
          this.claimsService.fetchClaims({id: this.claimId}).subscribe(res => {
            if(res.result.rows.length === 0) this.claimNotFound = true;
            this.claimLoading = false;
          });

        } 
        else if(claims.length !== 0) {
			this.claimLoading = false;
			this.claim = claims.find(c => +c.id === this.claimId);
			const claim: any = this.claim;
			const claimControls = Object.keys(claim).filter(cc => cc !== 'claimsDetail' && cc !== 'user');
			this.claimControls = claimControls;
			console.log({claimControls})
			const claimsDetailControls: any[] = Object.keys(claim.claimsDetail);
			this.claimsDetailControls = claimsDetailControls;
			// const claimsDetailControls = Object.keys(claim.claimsDetail).filter(cc => cc !== 'id');
			console.log({claimsDetailControls})
			this.updateFormInit(claim, claimControls, claimsDetailControls);
        }
      });
  }

  updateFormInit(claim: any, claimControls: any[], claimsDetailControl: any[]) {
	const claimsDetailGroup = this.fb.group({});
	claimsDetailControl.map(control => {
		claimsDetailGroup.addControl(`${control}`, new FormControl(claim.claimsDetail[control], {updateOn: 'change'}))
	})
	this.updateForm = this.fb.group({
		claimsDetail: claimsDetailGroup
	});
	claimControls.map(control => {
			this.updateForm?.addControl(`${control}`, new FormControl(claim[control], {updateOn: 'change'}));
	})

	console.log({checkDynaForm: this.updateForm.value});

	// this.updateForm = new FormGroup({
	// 	id: new FormControl(this.claim?.id, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	type: new FormControl(this.claim?.type, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	name: new FormControl(this.claim?.name, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	status: new FormControl(this.claim?.status, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	referenceNumber: new FormControl(this.claim?.referenceNumber, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	courtReferenceNumber: new FormControl(this.claim?.courtReferenceNumber, {
	// 		updateOn: 'change',
	// 		validators: []
	// 	}),
	// 	address: new FormControl(this.claim?.address, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	town: new FormControl(this.claim?.town, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	postCode: new FormControl(this.claim?.postCode, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	state: new FormControl(this.claim?.state, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	acnNumber: new FormControl(this.claim?.acnNumber, {
	// 		updateOn: 'change',
	// 		validators: [Validators.required]
	// 	}),
	// 	claimsDetail: new FormGroup({
	// 		id: new FormControl(this.claim?.claimsDetail.id, {
	// 			updateOn: 'change',
	// 			validators: [Validators.required]
	// 		}),
	// 		debtType: new FormControl(this.claim?.claimsDetail.debtType, {
	// 			updateOn: 'change',
	// 			validators: [Validators.required]
	// 		}),
	// 		totalOwed: new FormControl(this.claim?.claimsDetail.totalOwed, {
	// 			updateOn: 'change',
	// 			validators: [Validators.required]
	// 		}),
	// 		totalReceived: new FormControl(this.claim?.claimsDetail.totalReceived, {
	// 			updateOn: 'change',
	// 			validators: [Validators.required]
	// 		}),
	// 		existingClaimId: new FormControl(this.claim?.claimsDetail.existingClaimId, {
	// 			updateOn: 'change',
	// 			validators: [Validators.required]
	// 		}),
	// 		inCourt: new FormControl(this.claim?.claimsDetail.inCourt, {
	// 			updateOn: 'change',
	// 			validators: [Validators.required]
	// 		}),
	// 	})
	// })
  }


  claimUpdated(){
	  console.log({formUpdated: this.updateForm?.value})
	  this.claimsService.update(this.updateForm?.value).subscribe();
  }


  ngOnDestroy(): void {
      this.claimSub?.unsubscribe();
  }

}
