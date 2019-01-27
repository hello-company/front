import React from 'react';
import './styles.scss';
import { fetchGQL } from '../../services/Fetcher';
import { observable, getModel } from 'atom4';
import { Server } from '../../services/Server';

export const Space = observable(function Space() {
	// const space = {
	// 	id: 1,
	// 	name: 'Google',
	// 	users: [
	// 		{ id: 0, name: 'Vova', email: 'vova@mail.ru' },
	// 		{ id: 1, name: 'Ivan', email: 'ivan@mail.ru' },
	// 	],
	// };
	type SpaceType = {
		space: { id: string; name: string; users: { id: string; name: string }[] };
	};
	// const { space } = fetchGQL<SpaceType>(
	// 	`{space: getSpace(spaceId: "1") {id, name, users {id, name}}}`,
	// );

	const space = getModel(Server).query.getSpace<Auto>({ spaceId: '1' });
	if (!space) return null;
	// space2.name;
	// space2.users[0].name;
	return (
		<root>
			<title>Space {space.name}</title>
			<list>
				{space.users.map(user => (
					<item key={user.id}>
						<name>{user.name}</name>
						<remove>X</remove>
					</item>
				))}
				<AddUser />
			</list>
		</root>
	);
});

function AddUser() {
	return (
		<root>
			<name as="input" type="text" placeholder="Name" />
			<email as="input" type="email" placeholder="Email" />
			<add as="button">Add new user</add>
		</root>
	);
}
