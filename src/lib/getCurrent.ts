export async function getCurrent(key: string) {
	try {
		const response = await fetch(`${import.meta.env.VITE_SERVER}/auth/check`, {
			headers: {
				Authorization: `Bearer ${key}`
			}
		});

		// If status is unauthorize (not logged / admin user)
		if (response.status === 401) return null;

		return await response.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}
