/**
 * Created by john on 02/07/2017.
 */

import {Component, OnInit} from "@angular/core";
import {FormControl} from "@angular/forms";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {Angular2TokenService} from "angular2-token";
import {Tag} from "../models/tag";

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html'
})
export class TagsComponent implements OnInit {

  public searchTerm = new FormControl();

  private sort_by: string = 'count';
  private sort_direction: number = -1;
  public page: number = 1;
  public per_page: number = 36;
  public tags: Tag[] = [];
  public count: number = 0;

  constructor(private _tokenService: Angular2TokenService) {}

  public ngOnInit(): void {
    this.getTags();

    this.searchTerm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((term) => this.getTags(term));
  }

  private getTags(searchTerm: string = ''): void {

    const params = {
      page: this.page,
      per_page: this.per_page,
      sort_by: this.sort_by,
      sort_direction: this.sort_direction,
      search_term: searchTerm,
    };

    this._tokenService.get('tags', {search: params}).subscribe(
      (res) => {
        this.tags = [];
        const tagObjs = res.json().data;
        tagObjs.forEach((tagObj) => this.tags.push(new Tag(tagObj)));
        this.count = res.json().count;
      }, (error) => {
        console.log('TagsComponent getTags error');
        debugger;
      }
    )
  }

  public tabChange($event: NgbTabChangeEvent) {
    switch ($event.nextId) {
      case 'tab-popular':
        this.sort_by = 'count';
        this.sort_direction = -1;
        break;
      case 'tab-name':
        this.sort_by = 'name';
        this.sort_direction = 1;
        break;
      case 'tab-new':
        this.sort_by = 'created_at';
        this.sort_direction = -1;
        break;
      default:
        this.sort_by = 'count';
        this.sort_direction = -1;
    }

    if($event.activeId != $event.nextId)
      this.getTags();
  };

  public pageChangeEvent($event): void {
    this.page = $event;

    this.getTags();
  }

}
