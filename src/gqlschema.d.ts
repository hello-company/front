type ID = string;
type Int = number;
type Float = number;
export interface Query {
	__typename: 'Query';
	getMySpaces(args: {}): Space;
	getSpace(args: { spaceId: ID }): Space | undefined;
	myAccount(args: {}): Account | undefined;
	getDateDiff(args: { date: Date }): Int;
}
interface Mutation {
	__typename: 'Mutation';
	createSpace(args: { name: string }): Space;
	updateAccount(args: { photos?: ID[] }): Account;
}
interface User {
	__typename: 'User';

	id: ID;
	photos: Image[];
	name: string;
	info: string;
}
interface Account {
	__typename: 'Account';

	id: ID;
	photos: Image[];
	name: string;
	info: string;
	history: Coffee[];
}
interface Space {
	__typename: 'Space';

	id: ID;
	name: string;
	users: User[];
}
interface Coffee {
	__typename: 'Coffee';

	id: ID;
	user1: User;
	user2: User;
	date: Date;
	photos: Image[];
}
interface Image {
	__typename: 'Image';

	id: ID;
	url: string;
	width: Int;
	height: Int;
}
