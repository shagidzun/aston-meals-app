import Container from "@mui/material/Container";
import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography
} from "@mui/material";
import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "../../components/navigation/Navigation";
import { SearchField } from "../../components/search/SearchField";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectId, selectIsAuth } from "../../features/user/userSlice";
import { getHistory, selectHistory } from "../../features/history/historySlice";
//TODO: добавить состояние загрузки
export const History = () => {
	const userId = useAppSelector(selectId);
	const isAuth = useAppSelector(selectIsAuth);
	const dispatch = useAppDispatch();
	const history = useAppSelector(selectHistory);
	useEffect(() => {
		if (isAuth) {
			dispatch(getHistory(userId));
		}
	}, [dispatch, isAuth, userId]);
	return (
		<>
			<Navigation />
			<SearchField />
			<Container maxWidth="sm">
				{isAuth && history ? (
					<List sx={{ width: "100%", maxWidth: "sm" }}>
						<ListItem sx={{ bgcolor: "lightblue" }}>
							<ListItemText primary="History" />
						</ListItem>
						{history.map((url, i) => (
							<Fragment key={i}>
								{i !== 0 && <Divider component="li" />}
								<Link to={`${url}`}>
									<ListItem>
										<ListItemText primary={url} />
									</ListItem>
								</Link>
							</Fragment>
						))}
					</List>
				) : (
					<Typography>
						Only signed in users have history. <Link to="/signin">Sign in</Link>
					</Typography>
				)}
			</Container>
		</>
	);
};
