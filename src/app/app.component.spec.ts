import {NO_ERRORS_SCHEMA, DebugElement} from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';
import {Angular2TokenService} from "angular2-token";
import {Router} from "@angular/router";
import {Store, StoreModule} from "@ngrx/store";
import {Auth} from "./auth/service/auth";
import {Observable} from "rxjs";
import {By} from "@angular/platform-browser";
import {AUTH_SET_DATA, AUTH_RESET_DATA} from "./auth/service/auth.reducer";
import any = jasmine.any;
import anything = jasmine.anything;
import {TEST_CONST} from "../testing/constants";
import {Angular2TokenServiceStub} from "../testing/token-service.stub";
import {StoreStub} from "../testing/store.stub";
import {RouterStub} from "../testing/router.stub";

describe(`App`, () => {

  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers:    [
        {provide: Angular2TokenService, useClass: Angular2TokenServiceStub },
        {provide: Store, useClass: StoreStub},
        {provide: Router, useClass: RouterStub},
      ],
    })
      .compileComponents(); // compile template and css
  }));

  describe(`Logged In`, () => {

    let store;

    // synchronous beforeEach
    beforeEach(() => {
      store = TestBed.get(Store);
      spyOn(store, 'dispatch');

      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;

      fixture.detectChanges(); // trigger initial data binding
    });

    it(`should initialize successfully`, () => {
      expect(fixture).toBeDefined();
      expect(comp).toBeDefined();
    });

    it(`should display navigation menu properly`, () => {
      let de = fixture.debugElement.query(By.css('nav'));

      let leftNav = de.children[0].children;
      expect(leftNav[0].properties['routerLink']).toEqual(['/']);
      expect(leftNav[1].properties['routerLink']).toEqual(['home']);
      expect(leftNav[2].properties['routerLink']).toEqual(['profiles']);
      expect(leftNav[3].properties['routerLink']).toEqual(['tags']);
      expect(leftNav[4].properties['routerLink']).toEqual(['profiles', TEST_CONST.AUTH_ID]);

      let rightNav = de.children[1].children;
      expect(rightNav[0].listeners.length).toEqual(1);
      expect(rightNav[0].nativeElement.innerText).toEqual('Sign Out');
    });

    it(`should have auth information`, () => {
      expect(comp.auth).toEqual(TEST_CONST.AUTH_OBJ);
      expect(comp.links).toEqual({profile: ['profiles', TEST_CONST.AUTH_ID]});
    });

    it(`should dispatch auth info`, () => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith({type: AUTH_SET_DATA, payload: TEST_CONST.AUTH_OBJ})
    });

    it(`tokenService params`, () => {
      expect(comp.tokenServiceParams).toBeTruthy();

      expect(comp.tokenServiceParams.apiBase).toEqual(`http://${window.location.hostname}:3001`);
      expect(comp.tokenServiceParams.apiPath).toEqual('api');
      expect(comp.tokenServiceParams.signInStoredUrlStorageKey).toEqual('signInStoredUrlStorageKey');
      expect(comp.tokenServiceParams.signInRedirect).toEqual('auth/login');
      expect(comp.tokenServiceParams.signOutFailedValidate).toEqual(true);
      expect(comp.tokenServiceParams.resetPasswordCallback).toEqual(`${API_URL}/auth/resetPassword`);
      expect(comp.tokenServiceParams.oAuthBase).toEqual(`${API_URL}/api`);
      expect(comp.tokenServiceParams.oAuthPaths).toEqual({github: 'auth/github', google: 'auth/google_oauth2'});
    });

    describe(`Sign out test`, () => {

      let de;

      beforeEach(() => {
        spyOn(comp, 'signOut').and.callThrough();

        de = fixture.debugElement.query(By.css('nav'));
      });

      it(`signout button clicked -- failure`, () => {

        spyOn(comp._tokenService, 'signOut').and.returnValue(Observable.throw({msg: 'Stubbed Error!'}));
        spyOn(comp._router, 'navigateByUrl');

        de.children[1].children[0].triggerEventHandler('click', null);

        expect(comp.signOut).toHaveBeenCalledTimes(1);
        expect(comp._tokenService.signOut).toHaveBeenCalledTimes(1);
        expect(comp._router.navigateByUrl).toHaveBeenCalledWith('/');

      });

      it(`signout button clicked -- success`, () => {

        spyOn(comp._tokenService, 'signOut').and.returnValue(Observable.of({result: true}));
        de.children[1].children[0].triggerEventHandler('click', null);

        expect(comp.signOut).toHaveBeenCalledTimes(1);
        expect(comp._tokenService.signOut).toHaveBeenCalledTimes(1);
        expect(comp._store.dispatch).toHaveBeenCalledWith({type: AUTH_RESET_DATA});

      });

    });

    describe(`Token error`, () => {
      // synchronous beforeEach

      var tokenService;
      var router;
      beforeEach(() => {

        tokenService = TestBed.get(Angular2TokenService);
        spyOn(tokenService, 'validateToken').and.returnValue(Observable.throw({msg: 'Stubbed Error!'}));

        router = TestBed.get(Router);
        spyOn(router, 'navigateByUrl');

        fixture = TestBed.createComponent(AppComponent);
        comp    = fixture.componentInstance;
        fixture.detectChanges(); // trigger initial data binding
      });

      it(`Navigate to home`, () => {
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
        expect(router.navigateByUrl).toHaveBeenCalledWith('/');
      });

    });

  });





});
