import * as moment from "moment";

export const formatFirebaseDate = (date: any) => moment.isMoment(date) ? date.toDate() : date;