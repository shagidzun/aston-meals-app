import {
	TableBody,
	Table as MUITable,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@mui/material";

interface TableProps {
	ingredients: (string | null)[];
	measures: (string | null)[];
}

export const Table = ({ ingredients, measures }: TableProps) => {
	return (
		<TableContainer>
			<MUITable size="small">
				<TableHead>
					<TableRow>
						<TableCell>Ingredients</TableCell>
						<TableCell>Measure</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ingredients.map((ingredient, i) => (
						<TableRow key={i}>
							<TableCell>{ingredient}</TableCell>
							<TableCell>{measures[i]}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</MUITable>
		</TableContainer>
	);
};
