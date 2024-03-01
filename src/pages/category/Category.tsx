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
import { Link, useParams } from "react-router-dom";
import { Fragment } from "react";
import { Navigation } from "../../components/navigation/Navigation";
import {
	useGetMealsByCategoryQuery,
	useGetMealsCategoriesQuery
} from "../../services/mealsApi";
import { SearchField } from "../../components/search/SearchField";

export const Category = () => {
	const { category: currentCategory } = useParams();
	const { data: categoriesData } = useGetMealsCategoriesQuery();
	const { data, isError, isLoading } =
		useGetMealsByCategoryQuery(currentCategory);
	const matchedCategory = categoriesData?.categories.find(
		category => category.strCategory === currentCategory
	);
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
