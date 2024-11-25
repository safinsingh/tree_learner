import {
	pipe,
	object,
	integer,
	minValue,
	number,
	maxValue,
	string,
	minLength,
	maxLength
} from 'valibot';

export const schema = object({
	topic: pipe(string(), minLength(1), maxLength(30)),
	depth: pipe(number(), integer(), minValue(1), maxValue(5)),
	breadth: pipe(number(), integer(), minValue(1), maxValue(5))
});
