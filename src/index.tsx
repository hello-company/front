import { AtomProvider, Store } from 'atom4';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { Config } from './services/Config';
import { storeDevTools } from './utils/devTools';
import { ErrorBoundary } from './components/ErrorBoundary';

// const query = graphqlFactory<Query>('/api/graphql');
// query.getMyAccount().email;

// class MyStore extends Store {
//     query = graphqlFactory<Query>('/api/graphql');
// }
const store = new Store();
store.getInstance(Config).setBackendUrl('http://localhost:4000');
storeDevTools(store);

ReactDOM.render(
	<ErrorBoundary>
		<Suspense fallback={<div>Loading...</div>}>
			<AtomProvider store={store}>
				<App />
			</AtomProvider>
		</Suspense>
	</ErrorBoundary>,
	document.querySelector('#root'),
);
