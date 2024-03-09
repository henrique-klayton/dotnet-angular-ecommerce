import * as moment from 'moment';

export interface Constructable<T> {
	new(init?: Partial<T>): T;
}

export function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined {
	return value === undefined || value === null;
}

export function isNullOrWhitespace<T extends string>(
	value: T | null | undefined
): value is null | undefined {
	return isNullOrUndefined(value) || value === '';
}

export const formatFirebaseDate = (date: any) =>
	moment.isMoment(date) ? date.toDate() : date;

export function formatObjectToFirebase<T, D extends object>(
	obj: T,
	modelRef: Constructable<D>
) {
	let document: { [index: string]: D[keyof D]; } = {};
	Object.keys(new modelRef()).forEach(key => {
		// TODO Improve typing if possible
		const value = (obj as any)[key];
		if (!isNullOrUndefined(value))
			document[key] = value;
	});
	return document;
}
