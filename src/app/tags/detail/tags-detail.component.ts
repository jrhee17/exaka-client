/**
 * Created by john on 02/07/2017.
 */
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Angular2TokenService} from "angular2-token";
import {Tag} from "../../models/tag";
import {Post} from "../../models/post";
import {NgbTabChangeEvent} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'tags-detail',
  templateUrl: './tags-detail.component.html'
})
export class TagsDetailComponent implements OnInit {

  private name: string = '';

  public tag: Tag;
  public posts: Post[] = [];
  public count: number = 0;

  private sort_by: string = 'created_at';
  private sort_direction: number = -1;
  public page: number = 1;
  public per_page: number = 30;

  constructor(private _activatedRoute: ActivatedRoute, private _tokenService: Angular2TokenService) {
  }

  public ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.name = params['name'];
      this.getTagData();
    });
  }

  private getTagData(): void {
    if(!this.name)
      return;

    const params = {
      name: this.name,
      sort_by: this.sort_by,
      sort_direction: this.sort_direction,
      page: this.page,
      per_page: this.per_page,
    };

    this._tokenService.get(`tags/posts/${this.name}`, {search: params}).subscribe(
      (res) => {
        console.log('TagsDetailComponent ngOnInit res', res);
        this.posts = [];
        const tagObj = res.json().data.tag;
        const postObjs = res.json().data.posts;

        this.tag = new Tag(tagObj);
        postObjs.forEach((postObj) => this.posts.push(new Post(postObj)));
        this.count = res.json().count;

      }, (error) => {
        console.log('TagsDetailComponent ngOnInit error', error);
        debugger;
      }
    )
  }

  public tabChange($event: NgbTabChangeEvent) {

    switch ($event.nextId) {
      case 'tab-tag-detail-new':
        this.sort_by = 'created_at';
        this.sort_direction = -1;
        break;
      case 'tab-tag-detail-active':
        this.sort_by = 'updated_at';
        this.sort_direction = -1;
        break;
      default:
        this.sort_by = 'created_at';
        this.sort_direction = -1;
    }

    if($event.activeId != $event.nextId)
      this.getTagData();
  };

  public pageChangeEvent($event): void {
    this.page = $event;
    this.getTagData();
  }

}
