/**
 * Created by john on 05/05/2017.
 */
import {Component, Input, ViewChild, Output, EventEmitter, OnDestroy} from "@angular/core";
import {NgbModal, ModalDismissReasons, NgbPopover, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FileUploader, FileDropDirective, ParsedResponseHeaders, FileItem} from "ng2-file-upload";
import {Angular2TokenService} from "angular2-token";
import {last} from "@angular/router/src/utils/collection";

const URL = `http://${window.location.hostname}:3001/api/images/upload`;

@Component({
  selector: 'profile-edit-image',
  templateUrl: 'profile-edit-image.component.html',
  styleUrls: ['profile-edit-image.component.scss'],
})
export class ProfileEditImageComponent implements OnDestroy {
  @Input('selectedImage')
  public selectedImage: string;
  @Input('profileImage')
  public profileImage: string;
  @Input('identiconImage')
  public identiconImage: string;

  private imageUrl: string;

  @Output() imageUpdated = new EventEmitter();
  @Output() imageSelected = new EventEmitter();
  @Output() showModalUpload = new EventEmitter();

  @ViewChild('imageSelectPopOver')
  public popover: NgbPopover;

  private modalRef: NgbModalRef;

  constructor(private _modalService: NgbModal, private _tokenService: Angular2TokenService) {
  }

  open(content) {
    this.modalRef = this._modalService.open(content);
    this.modalRef.result.then((result) => {
      this.imageUrl = null;
    });
  }

  selectProfile(): void {
    this.imageSelected.emit({url: this.profileImage});
    this.popover.close();
  }

  selectIdenticon(): void {
    this.imageSelected.emit({url: this.identiconImage});
    this.popover.close();
  }

  selectUploadedImage(res): void {
    this.imageUpdated.emit(res);
    this.imageSelected.emit({url: res.data.image_file.url});
  }

  public closePopup(): void {
    this.popover.close();
  }

  ngOnDestroy() {
    this.popover.close();
  }

  uploadImageButtonPressed() {
    this.popover.close();
    this.showModalUpload.emit();
  }


}
