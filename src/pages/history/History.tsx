import Container from "@mui/material/Container";
import { LinearProgress, Typography } from "@mui/material";
import { Navigation } from "../../components/navigation/Navigation";
import { SearchField } from "../../components/search-field/SearchField";
import { useAppSelector, useGetData } from "../../app/hooks";
import {
	selectId,
	selectIsAuth,
	selectIsLoading
} from "../../features/user/userSlice";
import {
	getHistory,
	selectHistory,
	selectHistoryIsLoading
} from "../../features/history/historySlice";
import { HistoryList } from "../../components/HistoryList";
export const History = () => {
	const userId = useAppSelector(selectId);
	const isAuth = useAppSelector(selectIsAuth);
	const isUserLoading = useAppSelector(selectIsLoading);
	const isHistoryLoading = useAppSelector(selectHistoryIsLoading);
	const history = useAppSelector(selectHistory);
	useGetData(userId, getHistory);
	return isUserLoading ? (
		<LinearProgress />
	) : (
		<>
			<Navigation />
			<SearchField />
			<Container maxWidth="sm">
				{isHistoryLoading ? (
					<LinearProgress />
				) : isAuth && history?.length > 0 ? (
					<HistoryList history={history} />
				) : (
					<Typography variant="h6">History is empty</Typography>
				)}
			</Container>
		</>
	);
};
