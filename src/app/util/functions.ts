import * as moment from 'moment';

interface DocumentModel<T> {
	new(init?: Partial<T>): T;
}

export const formatFirebaseDate = (date: any) => moment.isMoment(date) ? date.toDate() : date;

export function formatObjectToDocument<T extends D, D>(obj: T, model: DocumentModel<D>) {
	let document: { [index: string ]: D[keyof D] } = {};
	for (let key in new model()) {
		document[key] = obj[key];
	}
	return document;
}
