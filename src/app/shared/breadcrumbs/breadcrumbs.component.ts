import { ActivationEnd, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  title: string;
  titleSubs: Subscription;

  constructor(private router: Router) {
    this.titleSubs = this.getTitleRuote().subscribe( ({ title }) => {
      this.title = title;
    });
  }

  getTitleRuote() {
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data ),
      );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.titleSubs.unsubscribe();
  }

}
