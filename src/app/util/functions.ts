import * as moment from 'moment';

interface DocumentModel<T> {
	new(init?: Partial<T>): T;
}

export const formatFirebaseDate = (date: any) => moment.isMoment(date) ? date.toDate() : date;

export function formatObjectToFirebase<T extends D, D>(
	obj: T,
	modelRef: DocumentModel<D>,
	ignoredFields: string[] = ['id']
) {
	let document: { [index: string]: D[keyof D] } = {};
	for (let key in new modelRef()) {
		if (key in ignoredFields)
			document[key] = obj[key];
	}
	return document;
}
