import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { FavoriteItem } from "../../features/favorites/favoritesSlice";
import { useTheme } from "../../context/context";

interface FavBtnProps {
	favorites?: FavoriteItem[];
	handleClick?: (
		meal: string | null | undefined,
		id: string | null | undefined,
		imgUrl: string | null | undefined
	) => void;
	item?: FavoriteItem;
}

export const FavBtn = ({ favorites, handleClick, item }: FavBtnProps) => {
	const { theme } = useTheme();
	return (
		<IconButton
			color={
				favorites?.some(
					favItem =>
						favItem.idMeal === item?.idMeal && favItem.strMeal === item?.strMeal
				)
					? "secondary"
					: theme
			}
			onClick={(e): void => {
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
