import { Store, addActionWatcher } from 'atom4';

export function storeDevTools(store: Store) {
    const ext = (window as any).__REDUX_DEVTOOLS_EXTENSION__
    if (!ext) return;
	const devTools = ext.connect({});
	devTools.subscribe((message: any) => {
		if (message.type === 'DISPATCH' && message.state) {
			// console.log('DevTools requested to change the state to', message.state);
			store.fromJSON(JSON.parse(message.state));
		}
	});
	addActionWatcher((actionName, payload) => {
		// console.log(actionName, store.toJSON());
		devTools.send(actionName, store.toJSON());
	});
	devTools.init(store.toJSON());
}
