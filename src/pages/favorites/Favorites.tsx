import Container from "@mui/material/Container";
import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography
} from "@mui/material";
import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchField } from "../../components/search/SearchField";
import { Navigation } from "../../components/navigation/Navigation";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectId, selectIsAuth } from "../../features/user/userSlice";
import {
	getFavorites,
	selectFavorites
} from "../../features/favorites/favoritesSlice";

export const Favorites = () => {
	const userId = useAppSelector(selectId);
	const isAuth = useAppSelector(selectIsAuth);
	const dispatch = useAppDispatch();
	const favorites = useAppSelector(selectFavorites);
	useEffect(() => {
		if (isAuth) {
			dispatch(getFavorites(userId));
		}
	}, [dispatch, isAuth, userId]);
	return (
		<>
			<Navigation />
			<SearchField />
			<Container maxWidth="sm">
				{isAuth && favorites ? (
					<List sx={{ width: "100%", maxWidth: "sm" }}>
						<ListItem sx={{ bgcolor: "lightblue" }}>
							<ListItemText primary="Favorites" />
						</ListItem>
						{favorites.map((item, i) => (
							<Fragment key={i}>
								{i !== 0 && <Divider component="li" />}
								<Link to={`/meal/${item.mealId}`}>
									<ListItem>
										<ListItemText primary={item.meal} />
									</ListItem>
								</Link>
							</Fragment>
						))}
					</List>
				) : (
					<Typography>
						Only signed in users have history. <Link to="/signin">Sign in</Link>
					</Typography>
				)}
			</Container>
		</>
	);
};