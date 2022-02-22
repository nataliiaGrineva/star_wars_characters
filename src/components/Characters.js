import { createStyles, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getCharacters } from '../store/actions/characters';
import Loader from './generic/Loader';
import Character from './Character';

const useStyles = makeStyles(() =>
	createStyles({
		content: {
			display: 'flex',
			flexWrap: 'wrap',
			margin: '0 auto',
			justifyContent: 'center',
		},
		pagination: {
			justifyContent: 'center',
		},
		paginationTop: {
			justifyContent: 'start',
		},
		ul: {
			justifyContent: 'center',
			'& .MuiPaginationItem-root': {
				color: '#29EEF7',
			},
			'& .Mui-selected': {
				color: '#FFE81F',
			},
		},
	}),
);

const Characters = () => {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const { isLoading, count, people, currentPage } = useSelector((store) => store);

	const pages = people && Math.ceil(count / 10);

	const chooseCard = (id) => {
		history.push(`person?id=${id}`);
	};

	const handleChange = (e) => {
		dispatch(getCharacters(e.target.textContent));
		setTimeout(() => {
			window.scrollTo({
				top: 0,
				left: 100,
				behavior: 'smooth',
			});
		}, 200);
	};

	return (
		<>
			{isLoading && <Loader />}
			<section className={classes.content}>
				{people.length &&
					people.map((item) => {
						const reg = /(https:\/\/swapi\.py4e\.com\/api\/people\/)(\d+)(\/)/;
						const idx = +item.url.replace(reg, '$2');

						return <Character key={idx} item={item} idx={idx} chooseCard={chooseCard} />;
					})}
			</section>
			<Pagination
				count={pages}
				page={currentPage}
				variant='outlined'
				shape='rounded'
				classes={{ ul: classes.ul }}
				className={classes.pagination}
				onChange={handleChange}
				hideNextButton
				hidePrevButton
			/>
		</>
	);
};

export default Characters;
