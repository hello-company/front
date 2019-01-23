import React from 'react';
import './styles.scss';

export function Space() {
	const space = {
		id: 1,
		name: 'Google',
		users: [
			{ id: 0, name: 'Vova', email: 'vova@mail.ru' },
			{ id: 1, name: 'Ivan', email: 'ivan@mail.ru' },
		],
	};
	return (
		<root>
			<title>Space {space.name}</title>
			<list>
				{space.users.map(user => (
					<item key={user.id}>
						<name>
							{user.name} {user.email}
						</name>
						<remove>X</remove>
					</item>
				))}
				<AddUser />
			</list>
		</root>
	);
}

function AddUser() {
	return (
		<root>
			<name as="input" type="text" placeholder="Name" />
			<email as="input" type="email" placeholder="Email" />
			<add as="button">Add new user</add>
		</root>
	);
}
