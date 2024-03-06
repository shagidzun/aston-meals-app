import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import type { FormEvent, SyntheticEvent } from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import { Form, Link, useNavigate } from "react-router-dom";
import { useGetMealByNameQuery } from "../../services/mealsApi";
import { useAppDispatch, useAppSelector, useDebounce } from "../../app/hooks";
import { updateHistory } from "../../features/history/historySlice";
import { selectId } from "../../features/user/userSlice";

// interface SearchFieldProps {
// 	url?: string,
// 	userId?: string
// }

export const SearchField = () => {
	const dispatch = useAppDispatch();
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const url = "/search/?q=" + searchTerm;
	const userId = useAppSelector(selectId);
	const { data, isLoading } = useGetMealByNameQuery(debouncedSearchTerm, {
		skip: debouncedSearchTerm.trim() === ""
	});
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(isLoading);
	const handleSearch = (
		_: SyntheticEvent<Element, Event>,
		value: string
	): void => {
		setSearchTerm(value);
		setLoading(searchTerm !== debouncedSearchTerm);
	};
	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();
		dispatch(updateHistory({ url, userId }));
		navigate(`/search/?q=${searchTerm}`);
	};
	return (
		<Container maxWidth="sm" sx={{ paddingTop: "20px" }}>
			<Form onSubmit={handleFormSubmit}>
				<Grid container spacing={1} alignItems="center">
					<Grid item xs>
						<Autocomplete
							freeSolo
							value={searchTerm}
							loading={
								loading &&
								debouncedSearchTerm.trim() !== "" &&
								data?.meals !== null
							}
							options={
								data?.meals && debouncedSearchTerm.trim() !== ""
									? data?.meals.map(meal => meal.strMeal)
									: []
							}
							onInputChange={handleSearch}
							filterOptions={x => x}
							renderInput={params => (
								<TextField {...params} label="Search meal" />
							)}
							renderOption={(props, option) => {
								const matchedMeal = data?.meals.find(
									meal => meal.strMeal === option
								);
								return (
									<li {...props}>
										<Link
											to={`/meal/${matchedMeal?.idMeal}`}
											style={{ textDecoration: "none", color: "inherit" }}
										>
											{option}
										</Link>
									</li>
								);
							}}
						/>
					</Grid>
					<Grid item>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							disabled={searchTerm === ""}
						>
							Search
						</Button>
					</Grid>
				</Grid>
			</Form>
		</Container>
	);
};
