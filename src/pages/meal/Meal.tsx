import Container from "@mui/material/Container";
import {
	Box,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetMealByIdQuery } from "../../services/mealsApi";
import { Navigation } from "../../components/navigation/Navigation";
import { filterProps } from "../../utils/filterProps";

export const Meal = () => {
	const { id } = useParams();
	const { data, isError, isSuccess } = useGetMealByIdQuery(id);
	const meal = data?.meals[0];
	const ingredients = filterProps(meal, "strIngredient");
	const measures = filterProps(meal, "strMeasure");
	return (
		<>
			<Navigation />
			<Container>
				<Stack spacing={2}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "top"
						}}
					>
						<figure>
							<img
								src={meal?.strMealThumb}
								alt={meal?.strMeal}
								style={{ width: 300 }}
							/>
							<figcaption>
								<Typography>{meal?.strMeal}</Typography>
							</figcaption>
						</figure>
						<TableContainer>
							<Table size="small">
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
							</Table>
						</TableContainer>
					</Box>
					<Box>
						<Typography variant="h3" gutterBottom>
							Instructions
						</Typography>
						<Typography variant="body1">{meal?.strInstructions}</Typography>
					</Box>
				</Stack>
			</Container>
		</>
	);
};
