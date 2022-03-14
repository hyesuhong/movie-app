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

// https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
