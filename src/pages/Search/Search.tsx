import Container from "@mui/material/Container";
import {
	Avatar,
	Divider,
	LinearProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
} from "@mui/material";
import { Fragment, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SearchField } from "../../components/search/SearchField";
import { Navigation } from "../../components/navigation/Navigation";
import { useGetMealByNameQuery } from "../../services/mealsApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectId,
	selectIsAuth,
	selectIsLoading
} from "../../features/user/userSlice";
import { ItemList } from "../../components/item-list/ItemList";
import {
	selectFavorites,
	updateFavorites
} from "../../features/favorites/favoritesSlice";

export const Search = () => {
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
			strMeal: string | undefined,
			idMeal: string | undefined,
			strMealThumb: string | undefined
		) => {
			if (isAuth) {
				dispatch(
					updateFavorites({ strMeal, idMeal, strMealThumb, userId } as {
						strMeal: string;
						idMeal: string;
						strMealThumb: string;
						userId: string;
					})
				);
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
				) : data?.meals === null ? (
					<Typography variant="h5">No meals found</Typography>
				) : (
					<ItemList
						data={data?.meals as []}
						page={"search"}
						favorites={favorites}
						handleClick={handleUpdateFavorites}
					/>
				)}
			</Container>
		</>
	);
};
