interface Credentials {
	email: string;
	password: string;
}

export interface User {
	credentials: Credentials;
	history: string[];
	favorites: string[];
}

export function parseLSItem(item: string | null): User | null {
	try {
		if (item === null) {
			return null;
		}
		return JSON.parse(item);
	} catch {
		return null;
	}
}
