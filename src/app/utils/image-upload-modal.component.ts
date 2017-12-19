/**
 * Created by john on 06/06/2017.
 */

import {Component, Output, EventEmitter, OnInit, Input, ViewChild} from "@angular/core";
import {NgbModalRef, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FileUploader, FileItem, ParsedResponseHeaders} from "ng2-file-upload";
import {Angular2TokenService} from "angular2-token";

@Component({
  selector: 'image-upload-modal',
  templateUrl: './image-upload-modal.component.html',
  styleUrls: [
    './image-upload-modal.component.scss'
  ],
})
export class ImageUploadModalComponent implements OnInit {

  private UPLOAD_IMAGE_URL = `${API_URL}/api/images/upload`;

  private modalRef: NgbModalRef;
  public uploader: FileUploader = new FileUploader({});
  public reader  = new FileReader();

  @Input('imageUrl')
  private imageUrl: string;

  @ViewChild('modalView')
  private modalView;

  @Output('uploadComplete')
  public uploadComplete: EventEmitter<any> = new EventEmitter<any>();

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private _modalService: NgbModal, private _tokenService: Angular2TokenService) {
  }

  ngOnInit(): void {
    this.initializeReader();
    this.initializeUploader();
  }

  public open() {
    this.modalRef = this._modalService.open(this.modalView);
    this.modalRef.result.then((result) => this.imageUrl = null, () => this.imageUrl = null);
  }

  private submit(): void {
    this.uploader.uploadAll();
  }

  private getImageUrl(): string {
    if(this.imageUrl)
      return this.imageUrl;
    return '';
  }

  /**
   * File upload related functions
   */

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  public fileDrop(fileList: Array<any>): void {
    this.uploader.addToQueue(fileList[0]);
    this.reader.readAsDataURL(fileList[0]);
  }

  private initializeUploader(): void {
    const headers = [];
    this._tokenService.currentAuthHeaders.forEach((values, key) => {
      headers.push({
        name: key,
        value: values[0]
      });
    });

    this.uploader.setOptions({
      autoUpload: false,
      headers: headers,
      method: 'POST',
      removeAfterUpload: true,
      url: this.UPLOAD_IMAGE_URL,
      isHTML5: true,
      queueLimit: 1,
    });

    const self = this;
    this.uploader.onSuccessItem = (item:FileItem, response:string, status:number, headers:ParsedResponseHeaders) => {
      const res = JSON.parse(response);
      self.uploadComplete.emit(res);
      self.modalRef.close();
    };

    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      debugger;
    }
  }

  private initializeReader(): void {
    this.reader.addEventListener('load', () => {
      this.imageUrl = this.reader.result;
    }, false);
  }

}
