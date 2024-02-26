import Container from "@mui/material/Container";
import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText
} from "@mui/material";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Navigation } from "../../components/navigation/Navigation";
import { useGetMealsCategoriesQuery } from "../../services/mealsApi";

export const Home = () => {
	const { data, isError, isSuccess } = useGetMealsCategoriesQuery();
	console.log(data);
	return (
		<>
			<Navigation />
			<Container maxWidth="sm">
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
			</Container>
		</>
	);
};
