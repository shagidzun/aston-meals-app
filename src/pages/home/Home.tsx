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

export const Home = () => {
	const { data, isError, isLoading } = useGetMealsCategoriesQuery();
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
					<List
						sx={{
							width: "100%",
							maxWidth: "sm",
							padding: "0px"
						}}
					>
						{data?.categories.map((category, i) => (
							<Fragment key={category.idCategory}>
								{i !== 0 && <Divider component="li" />}
								<Link to={`/category/${category.strCategory}`}>
									<ListItem>
										<ListItemAvatar>
											<Avatar
												src={category.strCategoryThumb}
												alt={category.strCategory}
											/>
										</ListItemAvatar>
										<ListItemText primary={category.strCategory} />
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
