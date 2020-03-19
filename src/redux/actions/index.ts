import { ADD_ARTICLE, UPDATE_INSTRUMENT } from '../constants/action-types';

export function addArticle(payload: any) {
  return { type: ADD_ARTICLE, payload };
}

export function updateInstrument(payload: any) {
  return { type: UPDATE_INSTRUMENT, payload };
}

(window as any).updateInstrument = updateInstrument;
