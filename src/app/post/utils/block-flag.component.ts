import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Component, Input} from "@angular/core";
import {BlockFlag} from "./block-flag";
import {Angular2TokenService} from "angular2-token";
import {Subject} from "rxjs";
/**
 * Created by john on 28/05/2017.
 */

@Component({
  selector: 'block-flag',
  templateUrl: './block-flag.component.html'
})
export class BlockFlagComponent {

  @Input('blockId')
  private blockId: string;

  @Input('disabled')
  public disabled: boolean;

  private blockFlag: BlockFlag = new BlockFlag();
  private modalRef : NgbModalRef;

  public successMessage: string;
  private _success = new Subject<string>();

  private flags: BlockFlag[] = [
    new BlockFlag('duplicate of...', 'This question has been asked before and already has an answer.', 'DUPLICATE'),
    new BlockFlag('off-topic because…', 'This question does not appear to be about programming within the scope defined in the help center.', 'OFF_TOPIC'),
    new BlockFlag('unclear what you\'re asking', 'Please clarify your specific problem or add additional details to highlight exactly what you need. As it\'s currently written, it’s hard to tell exactly what you\'re asking. See the How to Ask page for help clarifying this question.', 'UNCLEAR'),
    new BlockFlag('too broad', 'Please edit the question to limit it to a specific problem with enough detail to identify an adequate answer. Avoid asking multiple distinct questions at once. See the How to Ask page for help clarifying this question.', 'BROAD'),
    new BlockFlag('primarily opinion-based', 'Many good questions generate some degree of opinion based on expert experience, but answers to this question will tend to be almost entirely based on opinions, rather than facts, references, or specific expertise.', 'OPINION_BASED'),
    new BlockFlag('etc', 'Please leave a specific reason.', 'ETC'),
  ];

  constructor(private _modalService: NgbModal, private _tokenService: Angular2TokenService) {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.debounceTime(5000).subscribe(() => this.successMessage = null);

  }

  public open(content) {
    this.modalRef = this._modalService.open(content);
    this.modalRef.result.then(
      (res) => this.blockFlag = new BlockFlag(),
      (error) => this.blockFlag = new BlockFlag()
    )
  }

  private submitButtonPressed(): void {

    this.modalRef.close();

    this.blockFlag.block_id = this.blockId;
    this._tokenService.post('flags', this.blockFlag).subscribe(
      (res) => {
        this.modalRef.close();
        this._success.next('Flag has been successfully registered');
      }, (error) => {
        console.log('FlagComponent submitButtonPressed()');
        debugger;
      }
    );
  }

  private exposeAdditionalTextArea() : boolean {
    return this.blockFlag.code === 'ETC';
  }

  private submittable() : boolean {
    if(!this.blockFlag.code)
      return false;

    if(this.blockFlag.code === 'ETC' && !this.blockFlag.additional_text)
      return false;

    return true;
  }

}
