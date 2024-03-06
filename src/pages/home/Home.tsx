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
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Navigation } from "../../components/navigation/Navigation";
import { useGetMealsCategoriesQuery } from "../../services/mealsApi";
import { SearchField } from "../../components/search/SearchField";
import { useAppSelector } from "../../app/hooks";
import { selectIsLoading } from "../../features/user/userSlice";
import { ItemList } from "../../components/item-list/ItemList";

export const Home = () => {
	const isUserLoading = useAppSelector(selectIsLoading);
	const { data, isError, isLoading } = useGetMealsCategoriesQuery();
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
						) : isError || !data ? (
							<Typography variant="h5">Something went wrong :(</Typography>
						) : (
							<ItemList data={data?.categories as any[]} page="home" />
						)}
					</Container>
				</>
			)}
		</>
	);
};
