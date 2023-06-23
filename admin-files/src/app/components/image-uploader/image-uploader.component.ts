import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { map, Subscription } from 'rxjs';
import { Image } from 'src/app/pages/products/Product.model';
import { ImageService } from 'src/app/shared/services/images/image.service';
import { environment } from 'src/environments/environment';



const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  
@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})

export class ImageUploaderComponent implements OnInit, OnDestroy {
  @Input() multi: boolean = false;
  @Input() caseType: string = 'product';
  @Input() caseId: number = 1;
  @Input() showSectionHeader: boolean = true;
  @Input() sectionHeaderText: string = 'Upload Images Here';
  @Output() onSelectSingleImage = new EventEmitter<string>();

  postReqUrl = `${environment.url.base}/uploads/`;

  images!: Image[];
  imagesSUb!: Subscription;

  avatarUrl!: string;
  loading: boolean = false;

  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  deletedFile!: NzUploadFile;

  constructor(private msg: NzMessageService, public imageService: ImageService) {
    // this.deleteImage = this.deleteImage.bind(this);
  }

  ngOnInit(): void {
    this.imagesSUb = this.imageService.images.pipe(
      map(images => {
        return images.filter(image => image.caseType === this.caseType && image.caseId === this.caseId);
      })
    ).subscribe(images => {
      this.images = images;
      this.fileList = this.imageToFileListConverter(images);
      console.log({fileList: this.fileList});
    });

    this.changePage({page: 1, caseType: this.caseType, caseId: this.caseId});
  }

  changePage(data: any){
    this.imageService.fetch(data).subscribe();
  }


  imageToFileListConverter(images: Image[]): NzUploadFile[] {
    const list:NzUploadFile[] = []
    images.map(image => {
      const newFileEl: NzUploadFile = {
        uid: `${image.id}_${image.caseId}`,
        name: image.title,
        status: 'done',
        url: image.url
      }
      list.push(newFileEl);
    });
    return list;
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file['preview'];
    this.previewVisible = true;
  };

  fileUploading(eventChange: any){
    console.log({eventChange});
    console.log({fileList: this.fileList, type: eventChange.type})
    if(eventChange.type === 'removed'){
      console.log('removed');
      const id = eventChange.file.uid.split('_')[0];
      this.imageService.delete(id).subscribe(res => console.log({res, id}));
    }

  }

  handleChangeSingleUpload(info: { file: NzUploadFile, fileList: NzUploadFile[] }): void {
    console.log({info});
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.onSelectSingleImage.emit(info.fileList[info.fileList.length-1].response.result.url);
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });

        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }


  ngOnDestroy(): void {
      this.imagesSUb.unsubscribe();
  }

}
