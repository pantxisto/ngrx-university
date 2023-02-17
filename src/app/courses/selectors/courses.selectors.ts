import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";
import { Course } from "../model/course";
import { coursesFeatureKey, coursesSelectors, CoursesState } from "../reducers";

export const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectAllCourses = createSelector(
  selectCoursesState,
  coursesSelectors.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((c) => c.category === "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((c) => c.category === "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((c) => c.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  (state) => state.loaded
);
