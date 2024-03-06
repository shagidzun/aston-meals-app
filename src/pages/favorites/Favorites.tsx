import Container from "@mui/material/Container";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchField } from "../../components/search/SearchField";
import { Navigation } from "../../components/navigation/Navigation";
import {
	useAppDispatch,
	useAppSelector,
	useGetOrUpdateData
} from "../../app/hooks";
import { selectId, selectIsAuth } from "../../features/user/userSlice";
import {
	getFavorites,
	selectFavorites,
	updateFavorites
} from "../../features/favorites/favoritesSlice";
import { ItemList } from "../../components/item-list/ItemList";

export const Favorites = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(selectId);
	const isAuth = useAppSelector(selectIsAuth);
	const favorites = useAppSelector(selectFavorites);
	const handleUpdateFavorites = (
		strMeal: string | undefined,
		idMeal: string | undefined,
		strMealThumb: string | undefined
	) => {
		dispatch(
			updateFavorites({ strMeal, idMeal, strMealThumb, userId } as {
				strMeal: string;
				idMeal: string;
				strMealThumb: string;
				userId: string;
			})
		);
	};
	useGetOrUpdateData(userId, null, getFavorites);
	return (
		<>
			<Navigation />
			<SearchField />
			<Container maxWidth="sm">
				{isAuth && favorites ? (
					<>
						<List sx={{ width: "100%", maxWidth: "sm" }}>
							<ListItem sx={{ bgcolor: "lightblue" }}>
								<ListItemText primary="Favorites" />
							</ListItem>
						</List>
						<ItemList
							data={favorites as []}
							page={"favorites"}
							favorites={favorites}
							handleClick={handleUpdateFavorites}
						/>
					</>
				) : (
					<Typography>
						Only signed in users have history. <Link to="/signin">Sign in</Link>
					</Typography>
				)}
			</Container>
		</>
	);
};
