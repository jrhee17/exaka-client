import {Component, OnDestroy, OnInit} from "@angular/core";
import {Angular2TokenService} from "angular2-token";
import {User} from "../../models/user";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {FormControl} from "@angular/forms";
/**
 * Created by john on 01/07/2017.
 */

@Component({
  selector: 'profile-users',
  templateUrl: './profile-users.component.html',
})
export class ProfileUsersComponent implements OnInit, OnDestroy {

  public users: User[] = [];

  public sort_by: string = 'weekly_score';
  public sort_direction: number = -1;
  public per_page: number = 36;
  public page: number = 1;
  public count: number = 0;

  public searchTerm = new FormControl();

  constructor (private _tokenService: Angular2TokenService) {}

  public ngOnInit(): void {
    this.getUserData();

    this.searchTerm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((term) => this.getUserData(term));
  }

  public ngOnDestroy(): void {
  }

  public getUserData(searchTerm: string = ''): void {
    const params = {
      sort_by: this.sort_by,
      sort_direction: this.sort_direction,
      per_page: this.per_page,
      page: this.page,
      search_term: searchTerm,
    };

    this._tokenService.get('profiles', {search: params}).subscribe(
      (res) => {
        this.users = [];
        const userObjs = res.json().data;
        userObjs.forEach((userObj) => this.users.push(new User(userObj)));
        this.count = res.json().count;
      }, (error) => {
        console.log('ProfileUsersComponent getUserData error');
        debugger;
      }
    )
  }



  public tabChange($event: NgbTabChangeEvent) {
    switch ($event.nextId) {
      case 'tab-week':
        this.sort_by = 'weekly_score';
        break;
      case 'tab-month':
        this.sort_by = 'monthly_score';
        break;
      case 'tab-quarter':
        this.sort_by = 'quarterly_score';
        break;
      case 'tab-year':
        this.sort_by = 'yearly_score';
        break;
      case 'tab-all':
        this.sort_by = 'score';
        break;
      default:
        this.sort_by = 'weekly_score';
    }

    if($event.activeId != $event.nextId)
      this.getUserData();
  };

  public pageChangeEvent($event): void {
    this.page = $event;

    this.getUserData();
  }

}
