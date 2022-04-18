const API_KEY = 'be8d010a201fdfcf2c469ea542aac0d1';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: [];
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
}

export interface IGetTvShowResult {
	page: number;
	results: ITvShow[];
	total_results: number;
	total_pages: number;
}

export interface IPerson {
	profile_path: string;
	adult: boolean;
	id: number;
	media_type: string;
	known_for: IMovie[] | ITvShow[];
	name: string;
	popularity: number;
}

export interface IGetSearchResult {
	page: number;
	results: IMovie[] | ITvShow[] | IPerson[];
	total_results: number;
	total_pages: number;
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
