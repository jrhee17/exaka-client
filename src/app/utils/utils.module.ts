/**
 * Created by john on 06/06/2017.
 */

import {NgModule} from "@angular/core";
import {ImageUploadModalComponent} from "./image-upload-modal.component";
import {FileUploadModule} from "ng2-file-upload";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TimeSincePipe} from "./pipes/time-since.pipe";
import {FormatNumPipe} from "./pipes/format-num.pipe";
import {BasicTagComponent} from "./component/basic-tag.component";
import {RouterModule} from "@angular/router";
import {AlertPopoverComponent} from "./component/alert-popover.component";
import {LoggerService} from "./logger.service";
import {BasicUserBadgeComponent} from "./component/basic-user-badge.component";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";

@NgModule({
  imports: [
    FileUploadModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    SlimLoadingBarModule.forRoot()
  ],
  declarations: [
    ImageUploadModalComponent,
    TimeSincePipe,
    FormatNumPipe,
    BasicTagComponent,
    AlertPopoverComponent,
    BasicUserBadgeComponent,
  ],
  providers: [
    LoggerService,
  ],
  exports: [
    ImageUploadModalComponent,
    TimeSincePipe,
    FormatNumPipe,
    BasicTagComponent,
    AlertPopoverComponent,
    BasicUserBadgeComponent,
    SlimLoadingBarModule,
  ],
})
export class UtilsModule {

}
