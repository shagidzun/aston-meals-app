import Container from "@mui/material/Container";
import {
	Box,
	LinearProgress,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useGetMealByIdQuery } from "../../services/mealsApi";
import { Navigation } from "../../components/navigation/Navigation";
import { filterProps } from "../../utils/filterProps";
import { SearchField } from "../../components/search/SearchField";
import {
	selectFavorites,
	updateFavorites
} from "../../features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectId, selectIsLoading } from "../../features/user/userSlice";
import { FavBtn } from "../../components/fav-btn/FavBtn";

export const Meal = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(selectId);
	const favorites = useAppSelector(selectFavorites);
	const isUserLoading = useAppSelector(selectIsLoading);
	const { id } = useParams();
	const { data, isError, isLoading } = useGetMealByIdQuery(id);
	const meal = data?.meals[0];
	const ingredients = filterProps(meal, "strIngredient");
	const measures = filterProps(meal, "strMeasure");
	const handleUpdateFavorites = useCallback(
		(
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
		},
		[dispatch, userId]
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
										item={meal as {}}
										handleClick={handleUpdateFavorites}
										favorites={favorites}
									/>
								</figcaption>
							</figure>
							<TableContainer>
								<Table size="small">
									<TableHead>
										<TableRow>
											<TableCell>Ingredients</TableCell>
											<TableCell>Measure</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{ingredients.map((ingredient, i) => (
											<TableRow key={i}>
												<TableCell>{ingredient}</TableCell>
												<TableCell>{measures[i]}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
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
