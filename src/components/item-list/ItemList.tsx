import { Fragment } from "react";
import PropTypes from "prop-types";
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
import type { Category } from "../../types/apiTypes";

export type DataItem = FavoriteItem | Category;

interface ItemListProps {
	data: DataItem[];
	page: "home" | "category" | "favorites" | "search";
	favorites?: FavoriteItem[];
	handleClick?: (
		meal: string | null | undefined,
		id: string | null | undefined,
		imgUrl: string | null | undefined
	) => void;
}

export const ItemList = ({
	data,
	page,
	favorites,
	handleClick
}: ItemListProps) => {
	const isHomePage = page === "home";
	return (
		<List sx={{ width: "100%", maxWidth: "sm", padding: "0px" }}>
			{data.map((item, i) => {
				if ("idCategory" in item) {
					return (
						<Fragment key={item.idCategory}>
							{i !== 0 && <Divider component="li" />}
							<Link
								style={{ textDecoration: "none", color: "inherit" }}
								to={`/category/${item.strCategory}`}
							>
								<ListItem>
									{!isHomePage && (
										<FavBtn
											//выглядит странно, но по-другому не смог
											item={item as unknown as FavoriteItem}
											handleClick={handleClick}
											favorites={favorites}
										/>
									)}
									<ListItemAvatar>
										<Avatar src={item.strCategoryThumb} />
									</ListItemAvatar>
									<ListItemText primary={item.strCategory} />
								</ListItem>
							</Link>
						</Fragment>
					);
				} else {
					return (
						<Fragment key={item.idMeal}>
							{i !== 0 && <Divider component="li" />}
							<Link
								style={{ textDecoration: "none", color: "inherit" }}
								to={`/meal/${item.idMeal}`}
							>
								<ListItem>
									{!isHomePage && (
										<FavBtn
											item={item}
											handleClick={handleClick}
											favorites={favorites}
										/>
									)}
									<ListItemAvatar>
										<Avatar src={`${item.strMealThumb}`} />
									</ListItemAvatar>
									<ListItemText primary={item.strMeal} />
								</ListItem>
							</Link>
						</Fragment>
					);
				}
			})}
		</List>
	);
};

/*При использовании PropTypes возникает ошибка, связанная с самим пакетом и Vite
(у некоторых людей возникает такая проблема и с другими пакетами). Пытался пофиксить,
но общеизвестные методы не помогли, поэтому закомментил*/

// ItemList.propTypes = {
// 	data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
// 	page: PropTypes.oneOf(["home", "category", "favorites", "search"]),
// 	favorites: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			meal: PropTypes.string.isRequired,
// 			id: PropTypes.string.isRequired,
// 			imgUrl: PropTypes.string.isRequired
// 		})
// 	),
// 	handleClick: PropTypes.func
// };
