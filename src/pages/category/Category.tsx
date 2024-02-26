import Container from "@mui/material/Container";
import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { Navigation } from "../../components/navigation/Navigation";
import {
	useGetMealsByCategoryQuery,
	useGetMealsCategoriesQuery
} from "../../services/mealsApi";

export const Category = () => {
	const { category: currentCategory } = useParams();
	const { data: categoriesData } = useGetMealsCategoriesQuery();
	const { data, isError, isSuccess } =
		useGetMealsByCategoryQuery(currentCategory);
	const matchedCategory = categoriesData?.categories.find(
		category => category.strCategory === currentCategory
	);
	return (
		<>
			<Navigation />
			<Container maxWidth="sm">
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
					{data?.meals.map((category, i) => (
						<Fragment key={category.idMeal}>
							{i !== 0 && <Divider component="li" />}
							<ListItem>
								<ListItemAvatar>
									<Avatar src={category.strMealThumb} alt={category.strMeal} />
								</ListItemAvatar>
								<ListItemText primary={category.strMeal} />
							</ListItem>
						</Fragment>
					))}
				</List>
			</Container>
		</>
	);
};