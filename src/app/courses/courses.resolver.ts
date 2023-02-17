import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { loadAllCourses } from "./actions/course.actions";
import { Course } from "./model/course";
import { areCoursesLoaded } from "./selectors/courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<any> | Promise<any> {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((loaded) => {
        if (!this.loading && !loaded) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      filter((loaded) => loaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
