import { Card, CardMedia, createStyles, makeStyles, Typography, IconButton, TextareaAutosize, Divider } from '@material-ui/core';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ReactComponent as PenIcon } from '../images/pencil.svg';
import { addComment } from '../store/actions/characters';

const useStyles = makeStyles(() =>
	createStyles({
		card: {
			maxWidth: 250,
			margin: 5,
			cursor: 'pointer',
		},
		media: {
			height: 350,
			width: 250,
		},
		header: {
			fontSize: 20,
			fontStyle: 'bold',
			paddingLeft: 5,
		},
		comment: {
			display: 'flex',
			alignItems: 'flex-start',
		},
		commentText: {
			flex: 1,
			resize: 'none',
			fontFamily: 'san-serif',
			height: '40px!important',
			padding: '5px',
		},
	}),
);

const Character = ({ item, idx, chooseCard }) => {
	const classes = useStyles();
	const [disabled, setDisabled] = useState(true);
	const dispatch = useDispatch();
	const textAreaRef = useRef();

	useEffect(() => {
		if (!disabled) {
			textAreaRef.current.focus();
		}
	}, [disabled]);

	const enableEditing = () => {
		setDisabled(!disabled);
	};

	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			setDisabled(true);
		}
	};

	const onBlur = () => {
		setDisabled(true);
	};

	const handleComment = (e, name) => {
		const { value } = e.target;
		dispatch(
			addComment({
				name,
				comment: value,
			}),
		);
	};

	return (
		<Card key={item.name} className={classes.card} onClick={() => chooseCard(idx)}>
			<CardMedia image={`images/${idx < 17 ? idx : idx - 1}.jpg`} className={classes.media} />
			<Typography color='textSecondary' gutterBottom className={classes.header}>
				{item.name}
			</Typography>
			<Divider />
			<div role='presentation' className={classes.comment} onClick={(e) => e.stopPropagation()}>
				<TextareaAutosize
					className={classes.commentText}
					disabled={disabled}
					aria-label='maximum height'
					placeholder='add comment'
					defaultValue={item.comment}
					onChange={(e) => handleComment(e, item.name)}
					onKeyDown={onKeyDown}
					onBlur={onBlur}
					ref={textAreaRef}
				/>
				<IconButton color='primary' size='medium' onClick={enableEditing}>
					<PenIcon height={25} width={25} />
				</IconButton>
			</div>
		</Card>
	);
};

Character.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string.isRequired,
		comment: PropTypes.string.isRequired,
	}).isRequired,
	idx: PropTypes.number.isRequired,
	chooseCard: PropTypes.func.isRequired,
};

export default Character;
