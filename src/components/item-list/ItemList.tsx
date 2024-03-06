import { Fragment } from "react";
import {
	Avatar,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	List
} from "@mui/material";
import { Link } from "react-router-dom";
import type { FavoriteItem } from "../../features/favorites/favoritesSlice";
import { FavBtn } from "../fav-btn/FavBtn";

interface ItemListProps {
	data: { [key: string]: string }[];
	page: "home" | "category" | "favorites";
	favorites?: FavoriteItem[];
	handleClick?: (meal: string | undefined, id: string | undefined) => void;
}

export const ItemList = ({
	data,
	page,
	favorites,
	handleClick
}: ItemListProps) => {
	const isHomePage = page === "home";
	const isCategoryPage = page === "category";
	return (
		<List sx={{ width: "100%", maxWidth: "sm", padding: "0px" }}>
			{data.map((item, i) => (
				<Fragment
					key={
						isHomePage
							? item.idCategory
							: isCategoryPage
								? item.idMeal
								: item.mealid
					}
				>
					{i !== 0 && <Divider component="li" />}
					<Link
						to={
							isHomePage
								? `/category/${item.strCategory}`
								: isCategoryPage
									? `/meal/${item.idMeal}`
									: `/meal/${item.mealId}`
						}
					>
						<ListItem>
							{isCategoryPage && (
								<FavBtn
									item={item}
									handleClick={handleClick}
									favorites={favorites}
								/>
							)}
							<ListItemAvatar>
								<Avatar
									src={
										isHomePage
											? item.strCategoryThumb
											: isCategoryPage
												? item.strMealThumb
												: undefined
									}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={
									isHomePage
										? item.strCategory
										: isCategoryPage
											? item.strMeal
											: item.meal
								}
							/>
						</ListItem>
					</Link>
				</Fragment>
			))}
		</List>
	);
};
