import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { Fragment } from "react";
import { Link } from "react-router-dom";

interface HistoryListProps {
	history: string[];
}

export const HistoryList = ({ history }: HistoryListProps) => {
	return (
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
	);
};
