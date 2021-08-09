import * as moment from 'moment';

export interface Constructable<T> {
	new(init?: Partial<T>): T;
}

export const formatFirebaseDate = (date: any) => moment.isMoment(date) ? date.toDate() : date;

export function formatObjectToFirebase<T>(
	obj: T,
	test: any,
	ignoredFields: string[] = ['id']
) {
	let document: { [index: string]: T[keyof T] } = {};
	Object.keys(obj).forEach(key => {
		if (!ignoredFields.includes(key))
			document[key] = obj[key];
	});
	// for (const key in new modelRef()) {
	// }
	return document;
}
