import { Singletone, getModel, getModelBy } from 'atom4';
import { Mutation, Query } from '../gqlschema';
import { graphqlFactory } from '../utils/graphql';
import { fetchJSON, UrlCache } from './Fetcher';

export class Server extends Singletone {
	query = graphqlFactory<Query>(postGraphql);
	mutation = graphqlFactory<Mutation>(postGraphql);
	wsQuery = graphqlFactory<Query>(wsGraphql);
}

function postGraphql(query: string) {
	return fetchJSON('http://localhost:4000/api/graphql', {
		method: 'POST',
		body: JSON.stringify({ query }),
	});
}

function onComponentDestroy(fn: () => void) {}

async function wsGraphql(query: string) {
	const urlCache = getModel(UrlCache);
	const ws = await getWebSocket('wss://localhost:4000/api/graphql');
	const { promise, destroy } = createWSQuery(ws, query, data => urlCache.set(query, data));
	onComponentDestroy(destroy);
	return promise;
}

let promise: Promise<WebSocket> | undefined;
async function getWebSocket(url: string) {
	if (promise === undefined) {
		promise = new Promise((resolve, reject) => {
			const ws = new WebSocket(url);
			ws.addEventListener('open', () => resolve(ws));
			ws.addEventListener('error', reject);
		});
	}
	return promise;
}

function createWSQuery<T>(ws: WebSocket, q: string, onUpdate: (data: T) => void) {
	let listener: (msg: MessageEvent) => void;
	const promise = new Promise((resolve, reject) => {
		listener = msg => {
			if (msg.data.query === q) {
				resolve(msg.data);
				onUpdate(msg.data);
			}
		};
		ws.addEventListener('message', listener);
	});
	return {
		promise,
		destroy() {
			ws.removeEventListener('message', listener);
		},
	};
}

