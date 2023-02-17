import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { filter, first, map, tap } from "rxjs/operators";
import { CoursesEntityService } from "./course-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean> {
  constructor(private coursesService: CoursesEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.coursesService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.coursesService.getAll().pipe(map((courses) => !!courses));
        }
      }),
      filter((loaded) => loaded),
      first()
    );
  }
}
