import Container from "@mui/material/Container";
import {
	Avatar,
	LinearProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { Navigation } from "../../components/navigation/Navigation";
import {
	useGetMealsByCategoryQuery,
	useGetMealsCategoriesQuery
} from "../../services/mealsApi";
import { SearchField } from "../../components/search-field/SearchField";
import { useAppDispatch, useAppSelector, useGetData } from "../../app/hooks";
import {
	getFavorites,
	selectFavorites,
	updateFavorites
} from "../../features/favorites/favoritesSlice";
import {
	selectId,
	selectIsAuth,
	selectIsLoading
} from "../../features/user/userSlice";
import type { DataItem } from "../../components/item-list/ItemList";
import { ItemList } from "../../components/item-list/ItemList";

export const Category = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userId = useAppSelector(selectId);
	const favorites = useAppSelector(selectFavorites);
	const isUserLoading = useAppSelector(selectIsLoading);
	const isAuth = useAppSelector(selectIsAuth);
	const { category: currentCategory } = useParams();
	const { data: categoriesData } = useGetMealsCategoriesQuery();
	const { data, isError, isLoading } =
		useGetMealsByCategoryQuery(currentCategory);
	const matchedCategory = categoriesData?.find(
		category => category.strCategory === currentCategory
	);
	const handleUpdateFavorites = useCallback(
		(
			strMeal: string | null | undefined,
			idMeal: string | null | undefined,
			strMealThumb: string | null | undefined
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
	useGetData(userId, getFavorites);
	return isUserLoading ? (
		<LinearProgress />
	) : (
		<>
			<Navigation />
			<SearchField />
			<Container maxWidth="sm">
				{isLoading ? (
					<LinearProgress />
				) : isError ? (
					<Typography variant="h5">Something went wrong :(</Typography>
				) : (
					<>
						<List sx={{ width: "100%", maxWidth: "sm" }}>
							<ListItem sx={{ bgcolor: "lightblue" }}>
								<ListItemAvatar>
									<Avatar
										src={matchedCategory?.strCategoryThumb}
										alt={matchedCategory?.strCategory}
									/>
								</ListItemAvatar>
								<ListItemText primary={matchedCategory?.strCategory} />
							</ListItem>
						</List>
						<ItemList
							data={data as DataItem[]}
							handleClick={handleUpdateFavorites}
							page="category"
							favorites={favorites}
						/>
					</>
				)}
			</Container>
		</>
	);
};
