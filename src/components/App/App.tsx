import React from 'react';
import './styles.scss';
import { Space } from '../Space/Space';

export function App() {
	return (
		<root>
			<AllSpaces />
			<Space />
		</root>
	);
}

function AllSpaces() {
	const spaces = [{ id: 1, name: 'Google' }];
	return (
		<root>
			<title>My Spaces</title>
			<list>
				{spaces.map(space => (
					<item key={space.id}>
						<name>{space.name}</name>
						<remove>X</remove>
					</item>
				))}
				<add as="button">Create new Space</add>
			</list>
		</root>
	);
}
