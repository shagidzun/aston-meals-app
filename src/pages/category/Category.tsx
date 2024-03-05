import Container from "@mui/material/Container";
import {
	Avatar,
	Divider,
	IconButton,
	LinearProgress,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import { Favorite } from "@mui/icons-material";
import { Navigation } from "../../components/navigation/Navigation";
import {
	useGetMealsByCategoryQuery,
	useGetMealsCategoriesQuery
} from "../../services/mealsApi";
import { SearchField } from "../../components/search/SearchField";
import {
	useAppDispatch,
	useAppSelector,
	useGetOrUpdateData
} from "../../app/hooks";
import {
	getFavorites,
	selectFavorites,
	updateFavorites
} from "../../features/favorites/favoritesSlice";
import { selectId } from "../../features/user/userSlice";

export const Category = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(selectId);
	const favorites = useAppSelector(selectFavorites);
	const { category: currentCategory } = useParams();
	const { data: categoriesData } = useGetMealsCategoriesQuery();
	const { data, isError, isLoading } =
		useGetMealsByCategoryQuery(currentCategory);
	const matchedCategory = categoriesData?.categories.find(
		category => category.strCategory === currentCategory
	);
	const handleUpdateFavorites = (meal: string, mealId: string) => {
		dispatch(updateFavorites({ meal, mealId, userId }));
	};
	useGetOrUpdateData(userId, null, getFavorites);
	return (
		<>
			<Navigation />
			<SearchField />
			<Container maxWidth="sm">
				{isLoading ? (
					<LinearProgress />
				) : isError ? (
					<Typography variant="h5">Something went wrong :(</Typography>
				) : (
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
						{data?.meals.map((meal, i) => (
							<Fragment key={meal.idMeal}>
								{i !== 0 && <Divider component="li" />}
								<Link to={`/meal/${meal.idMeal}`}>
									<ListItem>
										<IconButton
											color={
												favorites.some(
													item =>
														item.mealId === meal.idMeal &&
														item.meal === meal.strMeal
												)
													? "secondary"
													: "primary"
											}
											onClick={e => {
												e.preventDefault();
												handleUpdateFavorites(meal.strMeal, meal.idMeal);
											}}
										>
											<Favorite />
										</IconButton>
										<ListItemAvatar>
											<Avatar
												src={meal.strMealThumb + "/preview"}
												alt={meal.strMeal}
											/>
										</ListItemAvatar>
										<ListItemText primary={meal.strMeal} />
									</ListItem>
								</Link>
							</Fragment>
						))}
					</List>
				)}
			</Container>
		</>
	);
};
