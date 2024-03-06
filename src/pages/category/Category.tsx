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
import { useParams } from "react-router-dom";
import { Navigation } from "../../components/navigation/Navigation";
import {
	useGetMealsByCategoryQuery,
	useGetMealsCategoriesQuery
} from "../../services/mealsApi";
import { SearchField } from "../../components/search/SearchField";
import { useAppDispatch, useAppSelector, useGetData } from "../../app/hooks";
import {
	getFavorites,
	selectFavorites,
	updateFavorites
} from "../../features/favorites/favoritesSlice";
import { selectId, selectIsLoading } from "../../features/user/userSlice";
import { ItemList } from "../../components/item-list/ItemList";

export const Category = () => {
	const dispatch = useAppDispatch();
	const userId = useAppSelector(selectId);
	const favorites = useAppSelector(selectFavorites);
	const isUserLoading = useAppSelector(selectIsLoading);
	const { category: currentCategory } = useParams();
	const { data: categoriesData } = useGetMealsCategoriesQuery();
	const { data, isError, isLoading } =
		useGetMealsByCategoryQuery(currentCategory);
	const matchedCategory = categoriesData?.categories.find(
		category => category.strCategory === currentCategory
	);
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
									data={data?.meals as []}
									handleClick={handleUpdateFavorites}
									page="category"
									favorites={favorites}
								/>
							</>
						)}
					</Container>
				</>
			)}
		</>
	);
};
