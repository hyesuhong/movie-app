export function makeImagePath(id: string, format?: string) {
	return id === '' || id === null
		? '/movie_app_v2/empty_img.svg'
		: `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
}
