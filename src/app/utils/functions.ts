import * as moment from 'moment';

export interface Constructable<T> {
	new(init?: Partial<T>): T;
}

export const isNullOrUndefined = (value: any) =>
	value === undefined || value === null;

export const isNullOrWhitespace = (value: any) =>
	isNullOrUndefined(value) || value === '';

export const formatFirebaseDate = (date: any) =>
	moment.isMoment(date) ? date.toDate() : date;

export function formatObjectToFirebase<T extends D, D>(
	obj: T,
	modelRef: Constructable<D>,
	ignoredFields: string[] = ['id']
) {
	let document: { [index: string]: D[keyof D] } = {};
	for (const key in new modelRef()) {
		if (!ignoredFields.includes(key))
			document[key] = obj[key];
	}
	return document;
}
