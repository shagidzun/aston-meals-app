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
	handleClick?: (
		meal: string | undefined,
		id: string | undefined,
		imgUrl: string | undefined
	) => void;
}

export const ItemList = ({
	data,
	page,
	favorites,
	handleClick
}: ItemListProps) => {
	const isHomePage = page === "home";
	const isCategoryPage = page === "category";
	const isFavoritesPage = page === "favorites";
	return (
		<List sx={{ width: "100%", maxWidth: "sm", padding: "0px" }}>
			{data.map((item, i) => (
				<Fragment
					key={
						isHomePage
							? item.idCategory
							: isCategoryPage
								? item.idMeal
								: item.mealId
					}
				>
					{i !== 0 && <Divider component="li" />}
					<Link
						to={
							isHomePage
								? `/category/${item.strCategory}`
								: `/meal/${item.idMeal}`
						}
					>
						<ListItem>
							{(isCategoryPage || isFavoritesPage) && (
								<FavBtn
									item={item}
									handleClick={handleClick}
									favorites={favorites}
								/>
							)}
							<ListItemAvatar>
								<Avatar
									src={isHomePage ? item.strCategoryThumb : item.strMealThumb}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={isHomePage ? item.strCategory : item.strMeal}
							/>
						</ListItem>
					</Link>
				</Fragment>
			))}
		</List>
	);
};
