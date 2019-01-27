declare namespace JSX {
	export interface IntrinsicElements {
		[other: string]:
			| React.DetailedHTMLProps<CustomHTMLAttributes, HTMLElement>
			| React.SVGProps<SVGElement>;
	}
}

interface CustomHTMLAttributes extends React.HTMLAttributes<HTMLElement> {
	as?: string;
}

type Usage<T, N> = { [K in keyof T]: T[K] extends Array<infer El> ? Usage<El, N & K>[] : Usage<T[K], N & K> };
type Auto = { auto: Auto };