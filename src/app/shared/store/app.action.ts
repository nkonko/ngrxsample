import { createAction, props } from "@ngrx/store";
import { Appstate } from "./model/appstate";


export const SetApiStatus = createAction(
  '[API] success or faiulre status',
  props<{apiStatus: Appstate}>()
)
