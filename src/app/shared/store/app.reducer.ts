import { createReducer, on } from "@ngrx/store";
import { SetApiStatus } from "./app.action";
import { Appstate } from "./model/appstate";



export const initialState: Readonly<Appstate> = {
  apiStatus:'',
  apiResponseMessage: ''
};

export const appReducer = createReducer(
  initialState,
  on(SetApiStatus, (state, {apiStatus}) => {
    return {
      ...state,
      ...apiStatus
    }
  })
)
