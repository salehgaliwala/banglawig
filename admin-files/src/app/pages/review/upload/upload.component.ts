import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../review';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss','../../../../../src/assets/bootstrap.css']
})
export class UploadComponent implements OnInit {
  myFiles: string[] = [];
  id!: string;
  imageSrc!: string;
  images: string[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }
  myForm = new FormGroup({
    
   
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params['reviewId'];
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.myFiles=[];
    const formData = new FormData();
    formData.append("caseType", 'reviews');
    formData.append("caseId", this.id);
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      reader.readAsDataURL(event.target.files[i]);
    }
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("file", this.myFiles[i]);
    }
    reader.onload = (event: any) => {

      this.imageSrc = reader.result as string;
      this.images.push(event.target.result);
      this.myForm.patchValue({
        fileSource: this.images
      });

    };
    this.http.post('http://localhost:8888/api/v1/uploads/', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })

  }

  submit() {
    this.router.navigateByUrl('review/index');
  }

}
