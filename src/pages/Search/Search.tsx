import Container from "@mui/material/Container";
import { LinearProgress, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchField } from "../../components/search-field/SearchField";
import { Navigation } from "../../components/navigation/Navigation";
import { useGetMealByNameQuery } from "../../services/mealsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectId,
	selectIsAuth,
	selectIsLoading
} from "../../features/user/userSlice";
import type { DataItem } from "../../components/item-list/ItemList";
import { ItemList } from "../../components/item-list/ItemList";
import { selectFavorites } from "../../features/favorites/favoritesSlice";
import { updateFavorites } from "../../features/actions-exports";

const Search = () => {
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isAuth = useAppSelector(selectIsAuth);
	const userId = useAppSelector(selectId);
	const q = searchParams.get("q");
	const isUserLoading = useAppSelector(selectIsLoading);
	const favorites = useAppSelector(selectFavorites);
	const { data, isLoading, isError } = useGetMealByNameQuery(q);
	const handleUpdateFavorites = useCallback(
		(
			strMeal: string | null | undefined,
			idMeal: string | null | undefined,
			strMealThumb: string | null | undefined
		): void => {
			if (isAuth) {
				dispatch(updateFavorites({ strMeal, idMeal, strMealThumb, userId }));
			} else {
				navigate("/signin");
			}
		},
		[dispatch, userId, isAuth, navigate]
	);
	return isUserLoading ? (
		<LinearProgress />
	) : (
		<>
			<Navigation />
			<SearchField q={q} />
			<Container maxWidth="sm">
				{isLoading ? (
					<LinearProgress />
				) : isError ? (
					<Typography variant="h5">Something went wrong :(</Typography>
				) : data === null ? (
					<Typography variant="h5">No meals found</Typography>
				) : (
					<ItemList
						data={data}
						page={"search"}
						favorites={favorites}
						handleClick={handleUpdateFavorites}
					/>
				)}
			</Container>
		</>
	);
};

export default Search;
