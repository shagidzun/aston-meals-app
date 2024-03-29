import Container from "@mui/material/Container";
import {
	LinearProgress,
	List,
	ListItem,
	ListItemText,
	Typography
} from "@mui/material";
import { useCallback } from "react";
import { SearchField } from "../../components/search-field/SearchField";
import { Navigation } from "../../components/navigation/Navigation";
import { useAppDispatch, useAppSelector, useGetData } from "../../app/hooks";
import {
	selectId,
	selectIsAuth,
	selectIsLoading
} from "../../features/user/userSlice";
import {
	selectFavIsLoading,
	selectFavorites
} from "../../features/favorites/favoritesSlice";
import { getFavorites, updateFavorites } from "../../features/actions-exports";
import { ItemList } from "../../components/item-list/ItemList";

const Favorites = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(selectId);
	const isUserLoading = useAppSelector(selectIsLoading);
	const isAuth = useAppSelector(selectIsAuth);
	const favorites = useAppSelector(selectFavorites);
	const isFavLoading = useAppSelector(selectFavIsLoading);
	const handleUpdateFavorites = useCallback(
		(
			strMeal: string | null | undefined,
			idMeal: string | null | undefined,
			strMealThumb: string | null | undefined
		) => {
			dispatch(updateFavorites({ strMeal, idMeal, strMealThumb, userId }));
		},
		[dispatch, userId]
	);
	useGetData(userId, getFavorites);
	return isUserLoading ? (
		<LinearProgress />
	) : (
		<>
			<Navigation />
			<SearchField />
			<Container maxWidth="sm">
				{isFavLoading ? (
					<LinearProgress />
				) : isAuth && favorites.length > 0 ? (
					<>
						<List sx={{ width: "100%", maxWidth: "sm" }}>
							<ListItem sx={{ bgcolor: "lightblue" }}>
								<ListItemText primary="Favorites" />
							</ListItem>
						</List>
						<ItemList
							data={favorites}
							page={"favorites"}
							favorites={favorites}
							handleClick={handleUpdateFavorites}
						/>
					</>
				) : (
					<Typography variant="h6">You have no favorite meals</Typography>
				)}
			</Container>
		</>
	);
};

export default Favorites;
