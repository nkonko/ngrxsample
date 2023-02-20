import { createFeatureSelector } from "@ngrx/store";
import { Appstate } from "./model/appstate";


export const selectAppState = createFeatureSelector<Appstate>('appState');
