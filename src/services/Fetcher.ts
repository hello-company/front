import { getModel, Singletone, AtomMap } from 'atom4';
import { Config } from './Config';

export function fetchGQL<T>(query: string): T {
	return (fetchJSON(getModel(Config).backendUrl + '/api/graphql?query=' + encodeURI(query)) as {
		data: T;
	}).data;
}
export function fetchJSON<T>(url: string, params?: RequestInit): T {
	const urlCache = getModel(UrlCache);
	const json = urlCache.get<T>(url);
	if (json instanceof Promise) throw json;
	if (json instanceof Error) throw json;
	if (json !== undefined) return json;
	const promise = fetch(url, params).then(body => body.json());
	promise.then(
		data => {
			return urlCache.set<T>(url, data);
		},
		err => {
			urlCache.set(url, err instanceof Error ? err : new Error(JSON.stringify(err)));
		},
	);
	urlCache.set(url, promise);
	throw promise;
}

// const LoadingSymbol = Symbol('Loading');
class UrlCache extends Singletone {
	protected cache: Map<
		string | number,
		object | undefined | Promise<{}> | Error
	> = new AtomMap<{}>();
	set<T>(url: string, value: T) {
		this.cache.set(url, value as {});
	}
	get<T>(url: string) {
		return this.cache.get(url) as T | undefined;
	}
}
