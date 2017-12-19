import {async, TestBed, fakeAsync, tick, discardPeriodicTasks} from "@angular/core/testing";
import {PostMainBlockComponent} from "./post-main-block.component";
import {NO_ERRORS_SCHEMA, Component, ViewChild} from "@angular/core";
import {FormatNumPipe} from "../../utils/pipes/format-num.pipe";
import {Store} from "@ngrx/store";
import {StoreStub} from "../../../testing/store.stub";
import {RouterStub} from "../../../testing/router.stub";
import {LoggerServiceStub} from "../../../testing/logger.service.stub";
import {AuthServiceStub} from "../../../testing/auth.service.stub";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {Observable} from "rxjs";
import {POST_MERGE_MAINBLOCK} from "../post.reducer";
import {By} from "@angular/platform-browser";
import {AuthModalComponent} from "../../auth/modal/auth-modal.component";
import {LoggerService} from "../../utils/logger.service";
import {AlertPopoverComponent} from "../../utils/component/alert-popover.component";
import {NgbPopover, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {UtilsModule} from "../../utils/utils.module";

import '../../../styles/styles.scss';
import '../../../styles/headings.css';

/**
 * Created by john on 05/10/2017.
 */

const MAIN_BLOCK_ID = '1234';
const TEST_MAIN_BLOCK_OBJ = {
  _id: MAIN_BLOCK_ID,
  favorite_users: [],
  comments: [],
  content_histories: [],
  isOwner: () => {
    return true;
  },
};
const TEST_MAIN_BLOCK_RESPONSE = {
  json() {
    return {data: {main_block: TEST_MAIN_BLOCK_OBJ}}
  }
};

@Component({
  template: `
    <div style="margin: 100px;">
      <post-main-block [mainBlock]="mainBlock" [postId]="'1234'" [tags]="''" #mainBlockObj></post-main-block>
    </div>
    `
})
class TestHostComponent {
  mainBlock = TEST_MAIN_BLOCK_OBJ;
  @ViewChild('mainBlockObj')
  public mainBlockObj;
}

describe(`PostMainBlockComponent`, () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        PostMainBlockComponent,
        TestHostComponent,
      ], imports: [
        UtilsModule,
      ], providers: [
        {provide: Store, useClass: StoreStub},
        {provide: Router, useClass: RouterStub},
        {provide: AuthService, useClass: AuthServiceStub},
        {provide: LoggerService, useClass: LoggerServiceStub},
      ], schemas: [
        NO_ERRORS_SCHEMA,
      ]
    }).compileComponents();
  }));

  let fixture;
  let hostComp;
  let comp;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComp = fixture.componentInstance;
    comp = hostComp.mainBlockObj;
    fixture.detectChanges();
  });

  it(`Component is defined`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  describe(`Upvoting works as expected`, () => {

    beforeEach(() => {
      spyOn(comp._authService, 'post').and.returnValue(Observable.of(TEST_MAIN_BLOCK_RESPONSE));
      spyOn(comp._store, 'dispatch');

      comp.upvote();
      fixture.detectChanges();
    });

    it(`Clicking upvote calls correct api`, () => {
      expect(comp._authService.post).toHaveBeenCalledTimes(1);
      expect(comp._authService.post).toHaveBeenCalledWith('main_blocks/upvote', {id: MAIN_BLOCK_ID});
    });

    it(`Successful response correctly dispatches`, () => {
      expect(comp._store.dispatch).toHaveBeenCalledTimes(1);
      expect(comp._store.dispatch).toHaveBeenCalledWith({type: POST_MERGE_MAINBLOCK, payload: TEST_MAIN_BLOCK_OBJ});
    });

    it(`Upvoted is correctly displayed`, () => {
      let de = fixture.debugElement.query(By.css('.upvote-btn'));
      comp.mainBlock.upvoted = true;
      fixture.detectChanges();

      expect(de.nativeElement.classList).toContain('vote_arrow');
    });

    it(`Not upvoted is correctly displayed`, () => {
      let de = fixture.debugElement.query(By.css('.upvote-btn'));
      comp.mainBlock.upvoted = false;
      fixture.detectChanges();

      expect(de.nativeElement.classList).toContain('novote_arrow');
    });

    it(`Vote increase is successfully displayed`, () => {
      let de = fixture.debugElement.query(By.css('.vote-num'));
      comp.mainBlock.vote = 1;
      fixture.detectChanges();
      expect(de.nativeElement.innerText).toEqual(String(1));

      comp.mainBlock.vote = 2;
      fixture.detectChanges();
      expect(de.nativeElement.innerText).toEqual(String(2));
    });

  });

  describe(`Upvoting throws exception and is properly managed`, () => {
    const ERROR_MSG = 'mocked error';

    beforeEach(() => {
      fixture.detectChanges();

      spyOn(comp._authService, 'post').and.returnValue(Observable.throw({message: ERROR_MSG}));
      spyOn(comp._loggerService, 'error');
      spyOn(comp.upvoteAlert, 'display').and.callThrough();

      comp.upvote();

      fixture.detectChanges();
    });

    it(`Exception is logged`, () => {
      expect(comp._loggerService.error).toHaveBeenCalledTimes(1);
      expect(comp._loggerService.error.calls.allArgs()[0][2].message).toEqual(ERROR_MSG);
    });

    it(`Message is displayed to user`, () => {
      expect(comp.upvoteAlert.display).toHaveBeenCalledTimes(1);
      let de = fixture.debugElement.query(By.css('.popover-body'));
      expect(de.nativeElement.innerText).toContain(comp.upvoteAlert.display.calls.mostRecent().args[0]);
      expect(comp.upvoteAlert.placement).toEqual('top');
    });

  });

  describe(`Downvoting works as expected`, () => {

    beforeEach(() => {
      spyOn(comp._authService, 'post').and.returnValue(Observable.of(TEST_MAIN_BLOCK_RESPONSE));
      spyOn(comp._store, 'dispatch');

      comp.downvote();
      fixture.detectChanges();
    });

    it(`Clicking downvote calls correct api`, () => {
      expect(comp._authService.post).toHaveBeenCalledTimes(1);
      expect(comp._authService.post).toHaveBeenCalledWith('main_blocks/downvote', {id: MAIN_BLOCK_ID});
    });

    it(`Successful response correctly dispatches`, () => {
      expect(comp._store.dispatch).toHaveBeenCalledTimes(1);
      expect(comp._store.dispatch).toHaveBeenCalledWith({type: POST_MERGE_MAINBLOCK, payload: TEST_MAIN_BLOCK_OBJ});
    });

    it(`Downvoted is correctly displayed`, () => {
      let de = fixture.debugElement.query(By.css('.downvote-btn'));
      comp.mainBlock.downvoted = true;
      fixture.detectChanges();

      expect(de.nativeElement.classList).toContain('vote_arrow');
    });

    it(`Not downvoted is correctly displayed`, () => {
      let de = fixture.debugElement.query(By.css('.downvote-btn'));
      comp.mainBlock.downvoted = false;
      fixture.detectChanges();

      expect(de.nativeElement.classList).toContain('novote_arrow');
    });

    it(`Vote decrease is successfully displayed`, () => {
      let de = fixture.debugElement.query(By.css('.vote-num'));
      comp.mainBlock.vote = 2;
      fixture.detectChanges();
      expect(de.nativeElement.innerText).toEqual(String(2));

      comp.mainBlock.vote = 1;
      fixture.detectChanges();
      expect(de.nativeElement.innerText).toEqual(String(1));
    });

  });

  describe(`Downvoting throws exception and is properly managed`, () => {
    const ERROR_MSG = 'mocked error';

    beforeEach(() => {
      fixture.detectChanges();

      spyOn(comp._authService, 'post').and.returnValue(Observable.throw({message: ERROR_MSG}));
      spyOn(comp._loggerService, 'error');
      spyOn(comp.downvoteAlert, 'display').and.callThrough();

      comp.downvote();
      fixture.detectChanges();
    });

    it(`Exception is logged`, () => {
      expect(comp._loggerService.error).toHaveBeenCalledTimes(1);
      expect(comp._loggerService.error.calls.allArgs()[0][2].message).toEqual(ERROR_MSG);
    });

    it(`Message is displayed to user`, () => {
      let de = fixture.debugElement.query(By.css('.popover-body'));

      expect(comp.downvoteAlert.display).toHaveBeenCalledTimes(1);
      expect(de.nativeElement.innerText).toContain(comp.downvoteAlert.display.calls.mostRecent().args[0]);
      expect(comp.downvoteAlert.placement).toEqual('bottom');
    });

  });



});
