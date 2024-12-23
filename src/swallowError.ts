export async function swallowError<T>(action: () => Promise<T>) {
	try {
		return await action();
	} catch {
		return undefined;
	}
}
