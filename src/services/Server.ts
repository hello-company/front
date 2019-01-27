import { Model, Singletone } from 'atom4';
import { Mutation, Query } from '../gqlschema';
import { graphqlFactory } from '../utils/graphql';
import { fetchJSON } from './Fetcher';

export class Server extends Singletone {
	query = graphqlFactory<Query>(postGraphql);
	mutation = graphqlFactory<Mutation>(postGraphql);
}

function postGraphql(query: string) {
	return fetchJSON('http://localhost:4000/api/graphql', {
		method: 'POST',
		body: JSON.stringify({ query }),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
