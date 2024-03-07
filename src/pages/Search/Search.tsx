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
import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchField } from "../../components/search/SearchField";
import { Navigation } from "../../components/navigation/Navigation";
import { useGetMealByNameQuery } from "../../services/mealsApi";
import { useAppSelector } from "../../app/hooks";
import { selectIsLoading } from "../../features/user/userSlice";

export const Search = () => {
	const [searchParams] = useSearchParams();
	const q = searchParams.get("q");
	const isUserLoading = useAppSelector(selectIsLoading);
	const { data, isLoading, isError } = useGetMealByNameQuery(q);
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
					<List sx={{ width: "100%", maxWidth: "sm" }}>
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
