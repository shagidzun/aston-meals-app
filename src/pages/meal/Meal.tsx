import Container from "@mui/material/Container";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { useGetMealByIdQuery } from "../../services/mealsApi";
import { Navigation } from "../../components/navigation/Navigation";
import { filterProps } from "../../utils/filterProps";
import { SearchField } from "../../components/search-field/SearchField";
import type { FavoriteItem } from "../../features/favorites/favoritesSlice";
import {
	selectFavorites,
	updateFavorites
} from "../../features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	selectId,
	selectIsAuth,
	selectIsLoading
} from "../../features/user/userSlice";
import { FavBtn } from "../../components/fav-btn/FavBtn";
import { Table } from "../../components/table/Table";

const Meal = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(selectId);
	const navigate = useNavigate();
	const favorites = useAppSelector(selectFavorites);
	const isUserLoading = useAppSelector(selectIsLoading);
	const isAuth = useAppSelector(selectIsAuth);
	const { id } = useParams();
	const { data, isError, isLoading } = useGetMealByIdQuery(id);
	const meal = data?.[0];
	const ingredients = filterProps(meal, "strIngredient");
	const measures = filterProps(meal, "strMeasure");
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
			<SearchField />
			<Container>
				{isLoading ? (
					<LinearProgress />
				) : isError ? (
					<Typography variant="h5">Something went wrong :(</Typography>
				) : (
					<Stack spacing={2}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "top"
							}}
						>
							<figure>
								<img
									src={meal?.strMealThumb}
									alt={meal?.strMeal}
									style={{ width: 300 }}
								/>
								<figcaption>
									<Typography>{meal?.strMeal}</Typography>
									<FavBtn
										/*здесь as, т.к. я сделал Partial<MealFull> на случай изменений в структуре API, а в FavoriteItem
										требуются все пропсы*/
										item={meal as FavoriteItem}
										handleClick={handleUpdateFavorites}
										favorites={favorites}
									/>
								</figcaption>
							</figure>
							<Table ingredients={ingredients} measures={measures} />
						</Box>
						<Box>
							<Typography variant="h3" gutterBottom>
								Instructions
							</Typography>
							<Typography variant="body1">{meal?.strInstructions}</Typography>
						</Box>
					</Stack>
				)}
			</Container>
		</>
	);
};

export default Meal;
