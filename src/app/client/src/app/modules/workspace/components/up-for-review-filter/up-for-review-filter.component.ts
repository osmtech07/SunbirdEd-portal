import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService, ConfigService } from '@sunbird/shared';
import { ISelectFilter } from '../../interfaces/selectfilter';
import * as _ from 'lodash';
@Component({
  selector: 'app-up-for-review-filter',
  templateUrl: './up-for-review-filter.component.html',
  styleUrls: ['./up-for-review-filter.component.css']
})
export class UpforReviewFilterComponent implements OnInit {
  /**
   * To navigate to other pages
   */
  route: Router;
  /**
   * To send activatedRoute.snapshot to router navigation
   * service for redirection to draft  component
  */
  private activatedRoute: ActivatedRoute;
  /**
   * selectedBoard
  */
  search: ISelectFilter;
  query: string;
  /**
   * upForReviewSortingOptions
  */
  sortingOptions: Array<string>;
  /**
   * Boards dropdown
  */
  boards: Array<string>;
  /**
   * mediums dropdown
  */
  mediums: Array<string>;
  /**
   * contentTypes dropdown
  */
  contentTypes: Array<string>;
  /**
   * subjects dropdown
  */
  subjects: Array<string>;
  /**
   * grades dropdown
  */
  grades: Array<string>;
  /**
    * To show / hide sortIcon
   */
  sortIcon = true;
  /**
    * position for the popup
  */
  position: string;
  /**
    * To show / hide AppliedFilter
   */
  isShowAppliedFilter = false;


  /**
    * To call resource service which helps to use language constant
  */
  public resourceService: ResourceService;
  /**
  * To get url, app configs
  */
  public config: ConfigService;

  sortByOption: string;
  public filterType: any;
  label: Array<string>;
  public redirectUrl: string;
  queryParams: any;
  /**
   * Constructor to create injected service(s) object
   Default method of Draft Component class
   * @param {SearchService} SearchService Reference of SearchService
   * @param {UserService} UserService Reference of UserService
   * @param {Router} route Reference of Router
   * @param {PaginationService} paginationService Reference of PaginationService
   * @param {ActivatedRoute} activatedRoute Reference of ActivatedRoute
   * @param {ConfigService} config Reference of ConfigService
 */
  constructor(resourceService: ResourceService, config: ConfigService,
    activatedRoute: ActivatedRoute,
    route: Router) {
    this.route = route;
    this.activatedRoute = activatedRoute;
    this.resourceService = resourceService;
    this.config = config;
    this.position = 'bottom right';
    this.route.onSameUrlNavigation = 'reload';
    this.label = this.config.dropDownConfig.FILTER.WORKSPACE.label;
  }

  ngOnInit() {
    this.filterType = this.config.appConfig.upForReview.filterType;
    this.redirectUrl = this.config.appConfig.upForReview.inPageredirectUrl;
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.queryParams =  { ...params };
        console.log( this.queryParams);
        this.query = this.queryParams['query'];
        this.sortByOption = this.queryParams['sort_by'];
    });
    this.sortingOptions = this.config.dropDownConfig.FILTER.RESOURCES.upForReviewSortingOptions;
  //  this.isShowAppliedFilter = true;
  }
  keyup(event) {
    this.query = event;
   if (this.query.length > 0) {
    this.queryParams['query'] = this.query;
   } else {
     delete this.queryParams['query'];
   }
    setTimeout(() => {
      this.route.navigate(['workspace/content/upForReview', 1], { queryParams: this.queryParams });
     }, 1000);
  }

  applySorting(sortByOption) {
    this.sortIcon = !this.sortIcon;
    this.queryParams['sort_by'] = sortByOption;
    this.route.navigate(['workspace/content/upForReview', 1], { queryParams: this.queryParams });
  }

  removeFilterSelection(filterType, value) {
    const itemIndex = this.queryParams[filterType].indexOf(value);
    if (itemIndex !== -1) {
      this.queryParams[filterType].splice(itemIndex, 1);
    }
    this.route.navigate(['workspace/content/upForReview', 1], { queryParams: this.queryParams });
  }
}
