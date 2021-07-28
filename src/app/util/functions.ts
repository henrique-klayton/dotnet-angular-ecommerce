import * as moment from 'moment';

export interface Constructable<T> {
	new(init?: Partial<T>): T;
}

export function isNullOrWhitespace(value: any) {
	if (value === undefined || value === null || value === '')
		return true;
	return false;
}

export const formatFirebaseDate = (date: any) => moment.isMoment(date) ? date.toDate() : date;

export function formatObjectToFirebase<T extends D, D>(
	obj: T,
	modelRef: Constructable<D>,
	ignoredFields: string[] = ['id']
) {
	let document: { [index: string]: D[keyof D] } = {};
	for (let key in new modelRef()) {
		if (!ignoredFields.includes(key))
			document[key] = obj[key];
	}
	return document;
}
