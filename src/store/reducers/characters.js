import { GET_CHARACTERS, GET_PERSON, SET_LOADING, ADD_COMMENT } from '../actions/types';

const initialState = {
	people: [],
	currentPage: 1,
	person: null,
	isLoading: false,
};

const characters = (state = initialState, action) => {
	const { payload, type } = action;
	switch (type) {
		case GET_CHARACTERS: {
			let page;
			if (!payload.next) {
				page = Math.ceil(+payload.count / 10);
			}
			if (!payload.previous) {
				page = 1;
			}
			if (payload.previous !== null && payload.next) {
				page = +payload.previous[payload.previous.length - 1] + 1;
			}
			const comments = JSON.parse(localStorage.getItem('COMMENTS')) || {};
			return {
				...state,
				people: payload.results.map((item) => {
					const comment = comments[item.name] || '';
					return { ...item, comment };
				}),
				currentPage: page,
				count: payload.count,
			};
		}
		case GET_PERSON:
			return {
				...state,
				person: payload,
			};
		case SET_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		case ADD_COMMENT: {
			const { name, comment } = payload;
			const newPeople = state.people.map((item) => (item.name === name ? { ...item, comment } : item));
			const comments = JSON.parse(localStorage.getItem('COMMENTS')) || {};
			comments[name] = comment;
			localStorage.setItem('COMMENTS', JSON.stringify(comments));
			return {
				...state,
				people: newPeople,
			};
		}
		default:
			return state;
	}
};

export default characters;
