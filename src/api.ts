const API_KEY = 'be8d010a201fdfcf2c469ea542aac0d1';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genres: [
		{
			id: number;
			name: string;
		}
	];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	runtime: number;
}

export interface IGetMovieResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export interface ITvShow {
	backdrop_path: string;
	id: number;
	first_air_date: string;
	last_air_date: string;
	poster_path: string;
	name: string;
	overview: string;
	genres: [
		{
			id: number;
			name: string;
		}
	];
	original_language: string;
}

export interface IGetTvShowResult {
	page: number;
	results: ITvShow[];
	total_results: number;
	total_pages: number;
}

export interface ISearch {
	profile_path?: string;
	backdrop_path?: string;
	poster_path?: string;
	id: number;
	media_type: string;
	name?: string;
	title?: string;
	overview?: string;
}

export interface IGetSearchResult {
	page: number;
	results: ISearch[];
	total_results: number;
	total_pages: number;
}

export interface IAuthorDetail {
	name: string;
	username: string;
	avatar_path: string;
	rating?: number;
}

export interface IReview {
	author: string;
	author_details: IAuthorDetail;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}

export interface IGetMovieReviews {
	id: number;
	page: number;
	results: IReview[];
	total_pages: number;
	total_results: number;
}

export function getMoviesNowPlaying() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getMoviesPopular() {
	return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getMoviesTop() {
	return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getMoviesUpcoming() {
	return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTvShowLatest() {
	return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}`).then((response) =>
		response.json()
	);
}

export function getTvShowsToday() {
	return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTvShowsPopular() {
	return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
		response.json()
	);
}

export function getTvShowsOnAir() {
	return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTvShowsTop() {
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function searchContent(search: string) {
	return fetch(
		`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${search}`
	).then((response) => response.json());
}

export function getMovieDetail(id: number) {
	return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`).then((response) =>
		response.json()
	);
}

export function getTvDetail(id: number) {
	return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}`).then((response) =>
		response.json()
	);
}

export function getMovieReviews(id: number) {
	return fetch(`${BASE_PATH}/movie/${id}/reviews?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
export function getMovieSimilar(id: number) {
	return fetch(`${BASE_PATH}/movie/${id}/similar?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}
