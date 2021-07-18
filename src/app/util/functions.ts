import * as moment from "moment";

export const formatFirebaseDate = (date: any) => moment.isMoment(date) ? date.toDate() : date;

export function formatObjectToDocument<T>(obj: T) {
  let doc: { [index: string ]: T[keyof T] } = {};
  for (let key in obj) {
    doc[key] = obj[key];
  }
  return doc;
}
