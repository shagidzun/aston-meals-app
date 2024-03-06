import Container from "@mui/material/Container";
import {
	LinearProgress,
	List,
	ListItem,
	ListItemText,
	Typography
} from "@mui/material";
import { SearchField } from "../../components/search/SearchField";
import { Navigation } from "../../components/navigation/Navigation";
import { useAppDispatch, useAppSelector, useGetData } from "../../app/hooks";
import {
	selectId,
	selectIsAuth,
	selectIsLoading
} from "../../features/user/userSlice";
import {
	getFavorites,
	selectFavorites,
	updateFavorites
} from "../../features/favorites/favoritesSlice";
import { ItemList } from "../../components/item-list/ItemList";

export const Favorites = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(selectId);
	const isUserLoading = useAppSelector(selectIsLoading);
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
	useGetData(userId, getFavorites);
	return (
		<>
			{isUserLoading && <LinearProgress />}
			{!isUserLoading && (
				<>
					<Navigation />
					<SearchField />
					<Container maxWidth="sm">
						{isAuth && favorites.length > 0 ? (
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
							<Typography variant="h6">You have no favorite meals</Typography>
						)}
					</Container>
				</>
			)}
		</>
	);
};
