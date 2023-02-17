import { createAction, props } from "@ngrx/store";
import { User } from "../model/user.model";

// We specify between [] the source of the action dispatched
// then wew decribe what the action does
export const login = createAction(
  "[Login Page] User Login",
  props<{ user: User }>()
);

export const logout = createAction("[Top Menu] User Logout");
