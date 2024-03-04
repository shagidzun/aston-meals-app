import Container from "@mui/material/Container";
import {
	Box,
	IconButton,
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
import { Favorite } from "@mui/icons-material";
import { useGetMealByIdQuery } from "../../services/mealsApi";
import { Navigation } from "../../components/navigation/Navigation";
import { filterProps } from "../../utils/filterProps";
import { SearchField } from "../../components/search/SearchField";
import { updateFavorites } from "../../features/favorites/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectId } from "../../features/user/userSlice";

export const Meal = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(selectId);
	const { id } = useParams();
	const { data, isError, isLoading } = useGetMealByIdQuery(id);
	const meal = data?.meals[0];
	const ingredients = filterProps(meal, "strIngredient");
	const measures = filterProps(meal, "strMeasure");
	const handleUpdateFavorites = (meal: string, mealId: string) => {
		dispatch(updateFavorites({ meal, mealId, userId }));
	};
	return (
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
									<IconButton
										onClick={e => {
											e.preventDefault();
											handleUpdateFavorites(
												//useQuery возращает "| undefined", поэтому тут as
												meal?.strMeal as string,
												meal?.idMeal as string
											);
										}}
									>
										<Favorite />
									</IconButton>
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
