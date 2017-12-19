import {async, TestBed} from "@angular/core/testing";
import {PostsSearchComponent} from "./posts-search.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {PostsSearchService} from "./posts-search.service";
import {FormatNumPipe} from "../../utils/pipes/format-num.pipe";
import {TimeSincePipe} from "../../utils/pipes/time-since.pipe";
import {Observable} from "rxjs";
import {UtilsModule} from "../../utils/utils.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BasicTagComponent} from "../../utils/component/basic-tag.component";
import {AppModule} from "../../app.module";
import {Angular2TokenService} from "angular2-token";
import {Auth} from "../../auth/service/auth";
import {Angular2TokenServiceStub} from "../../../testing/token-service.stub";
import {Post} from "../../models/post";
/**
 * Created by john on 02/10/2017.
 */

const TEST_POSTS = [new Post({_id: 1}), new Post({_id: 2})];

class PostsSearchServiceStub {
  getPosts(a: any, b: any) {
    return Observable.of({posts: TEST_POSTS, count: TEST_POSTS.length});
  }
}



describe(`PostsSearchComponent`, () => {

  let fixture;
  let comp;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostsSearchComponent, BasicTagComponent, FormatNumPipe, TimeSincePipe, ],
      // imports: [UtilsModule, NgbModule.forRoot(),],
      // imports: [AppModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: PostsSearchService, useClass: PostsSearchServiceStub },
        {provide: Angular2TokenService, useClass: Angular2TokenServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsSearchComponent);
    comp    = fixture.componentInstance;
  });

  it(`should initialize successfully`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  describe(`check get posts is successful`, () => {

    beforeEach(() => {
      spyOn(comp, 'getPosts').and.callThrough();
      spyOn(comp._postsSearchService, 'getPosts').and.returnValue(Observable.of({posts: TEST_POSTS, count: TEST_POSTS.length}).toPromise());

      fixture.detectChanges(); // trigger initial data binding
    });


    it(`check if comp.getPosts is called on init`, () => {
      expect(comp.getPosts).toHaveBeenCalledTimes(1);
    });

    it(`check if postService.getPosts is called on init`, async(() => {
      expect(comp._postsSearchService.getPosts).toHaveBeenCalledTimes(1);
      expect(comp._postsSearchService.getPosts).toHaveBeenCalledWith(1, 15);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(comp.posts).toEqual(TEST_POSTS);
        expect(comp.pageNum).toEqual(1);
        expect(comp.count).toEqual(TEST_POSTS.length);
      });
    }));

  });


});
