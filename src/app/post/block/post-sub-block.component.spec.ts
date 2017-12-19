import {TestBed, async} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA, Component, ViewChild} from "@angular/core";
import {PostSubBlockComponent} from "./post-sub-block.component";
import {UtilsModule} from "../../utils/utils.module";
import {LoggerServiceStub} from "../../../testing/logger.service.stub";
import {LoggerService} from "../../utils/logger.service";
import {AuthServiceStub} from "../../../testing/auth.service.stub";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {RouterStub} from "../../../testing/router.stub";
import {Store} from "@ngrx/store";
import {StoreStub} from "../../../testing/store.stub";
import {Observable} from "rxjs";
import {POST_MERGE_SUBBLOCK} from "../post.reducer";
import {By} from "@angular/platform-browser";
/**
 * Created by john on 06/10/2017.
 */

const SUB_BLOCK_ID = '1234';
const TEST_SUB_BLOCK_OBJ = {
  _id: SUB_BLOCK_ID,
  favorite_users: [],
  comments: [],
  content_histories: [],
  isOwner: () => {
    return true;
  },
  getCreatedAt: () => {
    return '2017-01-01 00:00:00';
  },
  owner: {
    getImage: () => {
      return 'assets/img/icon64.png';
    }
  }
};
const TEST_POST_OBJ = {
  isOwner: () => {
    return true;
  },
};
const TEST_SUB_BLOCK_RESPONSE = {
  json() {
    return {data: {sub_block: TEST_SUB_BLOCK_OBJ}}
  }
};

@Component({
  template: `
    <div style="margin: 100px;">
      <post-sub-block [subBlock]="subBlock" [post]="post" (select)="selectButtonPressed" #subBlockComponent></post-sub-block>
    </div>
    `
})
class TestHostComponent {
  subBlock = TEST_SUB_BLOCK_OBJ;
  post = TEST_POST_OBJ;
  selectButtonPressed($event): void {

  }
  @ViewChild('subBlockComponent')
  public subBlockComponent;
}

describe(`PostSubBlockComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostSubBlockComponent,
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
  let comp;
  let hostComp;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComp = fixture.componentInstance;
    comp = hostComp.subBlockComponent;
    fixture.detectChanges();
  });

  it(`Component definition test`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  describe(`Upvote works as expected`, () => {

    beforeEach(() => {
      spyOn(comp._authService, 'post').and.returnValue(Observable.of(TEST_SUB_BLOCK_RESPONSE));
      spyOn(comp._store, 'dispatch');

      comp.upvote();
      fixture.detectChanges();
    });

    it(`Clicking upvote calls correct api`, () => {
      expect(comp._authService.post).toHaveBeenCalledTimes(1);
      expect(comp._authService.post).toHaveBeenCalledWith('sub_blocks/upvote', {id: SUB_BLOCK_ID});
    });

    it(`Successful response correctly dispatches`, () => {
      expect(comp._store.dispatch).toHaveBeenCalledTimes(1);
      expect(comp._store.dispatch).toHaveBeenCalledWith({type: POST_MERGE_SUBBLOCK, payload: TEST_SUB_BLOCK_OBJ});
    });

    it(`Upvoted is correctly displayed`, () => {
      let de = fixture.debugElement.query(By.css('.upvote-btn'));
      comp.subBlock.upvoted = true;
      fixture.detectChanges();

      expect(de.nativeElement.classList).toContain('vote_arrow');
    });

    it(`Not upvoted is correctly displayed`, () => {
      let de = fixture.debugElement.query(By.css('.upvote-btn'));
      comp.subBlock.upvoted = false;
      fixture.detectChanges();

      expect(de.nativeElement.classList).toContain('novote_arrow');
    });

    it(`Vote increase is successfully displayed`, () => {
      let de = fixture.debugElement.query(By.css('.vote-num'));
      comp.subBlock.vote = 1;
      fixture.detectChanges();
      expect(de.nativeElement.innerText).toEqual(String(1));

      comp.subBlock.vote = 2;
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
      spyOn(comp._authService, 'post').and.returnValue(Observable.of(TEST_SUB_BLOCK_RESPONSE));
      spyOn(comp._store, 'dispatch');

      comp.downvote();
      fixture.detectChanges();
    });

    it(`Clicking downvote calls correct api`, () => {
      expect(comp._authService.post).toHaveBeenCalledTimes(1);
      expect(comp._authService.post).toHaveBeenCalledWith('sub_blocks/downvote', {id: SUB_BLOCK_ID});
    });

    it(`Successful response correctly dispatches`, () => {
      expect(comp._store.dispatch).toHaveBeenCalledTimes(1);
      expect(comp._store.dispatch).toHaveBeenCalledWith({type: POST_MERGE_SUBBLOCK, payload: TEST_SUB_BLOCK_OBJ});
    });

    it(`Downvoted is correctly displayed`, () => {
      let de = fixture.debugElement.query(By.css('.downvote-btn'));
      comp.subBlock.downvoted = true;
      fixture.detectChanges();

      expect(de.nativeElement.classList).toContain('vote_arrow');
    });

    it(`Not downvoted is correctly displayed`, () => {
      let de = fixture.debugElement.query(By.css('.downvote-btn'));
      comp.subBlock.downvoted = false;
      fixture.detectChanges();

      expect(de.nativeElement.classList).toContain('novote_arrow');
    });

    it(`Vote decrease is successfully displayed`, () => {
      let de = fixture.debugElement.query(By.css('.vote-num'));
      comp.subBlock.vote = 2;
      fixture.detectChanges();
      expect(de.nativeElement.innerText).toEqual(String(2));

      comp.subBlock.vote = 1;
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
