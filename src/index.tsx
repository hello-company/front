import { AtomProvider, Store, Singletone, observable, getModel, AtomMap } from 'atom4';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { Config } from './services/Config';
import { storeDevTools } from './utils/devTools';
import { ErrorBoundary } from './components/ErrorBoundary';
import { UrlCache } from './services/Fetcher';

// const query = graphqlFactory<Query>('/api/graphql');
// query.getMyAccount().email;

// class MyStore extends Store {
//     query = graphqlFactory<Query>('/api/graphql');
// }
// const cache = new AtomMap<string>();
let loadT = 0;

const store = new Store();
store.getInstance(Config).setBackendUrl('http://localhost:4000');
storeDevTools(store);

class RouterModel extends Singletone {
	url = location.pathname;
	setUrl(url: string) {
		if (location.pathname !== url) {
			history.replaceState({}, '', url);
		}
		this.url = url;
	}
}

const Route = observable(function Route(props: { path: string; children?: React.ReactNode }) {
	const model = getModel(RouterModel);
	// console.log(props.path, model.url);
	if (props.path === model.url) {
		return <>{props.children}</>;
	}
	return null;
});

const Link = observable(function Link(props: { path: string; children?: React.ReactNode }) {
	const model = getModel(RouterModel);
	function click(e: React.MouseEvent) {
		e.preventDefault();
		function setUrl() {
			const prevUrl = model.url;
			model.setUrl(props.path);
			// syncComponents({
			// 	onSuspense(promise: Promise<{}>) {
			// 		model.setUrl(prevUrl);
			// 		promise.then(setUrl);
			// 	},
			// });
		}
		setUrl();
	}
	return (
		<a href={props.path} onClick={click}>
			{props.children}
		</a>
	);
});

const X = observable(function X() {
	return <div>x: {load('x')}</div>;
});
const Y = observable(function Y() {
	return <div>y: {load('y')}</div>;
});
const Z = observable(function Z() {
	// console.log('ZZZZZZ');
	return <div>z: {load('z')}</div>;
});

// const ConcurrentMode = React.unstable_ConcurrentMode;

class MySuspense extends React.Component {
	state = { error: false };
	static getDerivedStateFromError(error: any) {
		// console.log(error);
		return { error: true };
	}
	render() {
		if (this.state.error) return <div>Error</div>;
		return <>{this.props.children}</>;
	}
}

const MyApp = observable(function MyApp() {
	// console.log('MyApp');
	const model = getModel(RouterModel);
	return (
		<div>
			<h1>{model.url}</h1>
			<div>
				<Link path="/x">goto x</Link>
				<Link path="/y">goto y</Link>
				<Link path="/z">goto z</Link>
			</div>
			<Route path="/x">
				<X />
			</Route>
			<Route path="/y">
				<Y />
			</Route>
			<Route path="/z">
				<Z />
			</Route>
			{model.url}
		</div>
	);
});

class Widget extends React.Component {
	render() {
		return (
			<Suspense fallback={<Loading />}>
				<widget>{this.props.children}</widget>
			</Suspense>
		);
	}
}

function Loading() {
	console.log('Loading');
	return (
		<loading>
			<text>Loading...</text>
		</loading>
	);
}
ReactDOM.render(
	// <ConcurrentMode>
	<ErrorBoundary>
		<AtomProvider store={store}>
			<Widget>
				<MyApp />
				{/* <App /> */}
			</Widget>
		</AtomProvider>
	</ErrorBoundary>,
	//  </ConcurrentMode>,
	document.querySelector('#root'),
);



function load(url: string) {
	const urlCache = getModel(UrlCache);
	const val = urlCache.get(url);
	if (val) return val;
	console.log('---------------');
	loadT++;
	throw new Promise(resolve =>
		setTimeout(
			() => {
				urlCache.set(url, url);
				resolve();
			},
			loadT === 1 ? 500 : 1000,
		),
	);
}
