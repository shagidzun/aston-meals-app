import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { FavoriteItem } from "../../features/favorites/favoritesSlice";

interface FavBtnProps {
	favorites?: FavoriteItem[];
	handleClick?: (
		meal: string | undefined,
		id: string | undefined,
		imgUrl: string | undefined
	) => void;
	item?: { [key: string]: string };
}

export const FavBtn = ({ favorites, handleClick, item }: FavBtnProps) => {
	return (
		<IconButton
			color={
				favorites?.some(
					favItem =>
						favItem.idMeal === item?.idMeal && favItem.strMeal === item?.strMeal
				)
					? "secondary"
					: "primary"
			}
			onClick={e => {
				e.preventDefault();
				if (handleClick) {
					handleClick(item?.strMeal, item?.idMeal, item?.strMealThumb);
				}
			}}
		>
			<Favorite />
		</IconButton>
	);
};
