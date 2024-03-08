import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import type { FormEvent, SyntheticEvent } from "react";
import { useCallback } from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import { Form, Link, useNavigate } from "react-router-dom";
import { useGetMealByNameQuery } from "../../services/mealsApi";
import { useAppDispatch, useAppSelector, useDebounce } from "../../app/hooks";
import { updateHistory } from "../../features/history/historySlice";
import { selectId } from "../../features/user/userSlice";

interface SearchFieldProps {
	q?: string | null;
}

export const SearchField = ({ q }: SearchFieldProps) => {
	const dispatch = useAppDispatch();
	const [searchTerm, setSearchTerm] = useState<string>(q ?? "");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const url = "/search/?q=" + encodeURIComponent(searchTerm);
	const userId = useAppSelector(selectId);
	const { data, isLoading } = useGetMealByNameQuery(debouncedSearchTerm, {
		skip: debouncedSearchTerm.trim() === ""
	});
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(isLoading);
	const handleSearch = useCallback(
		(_: SyntheticEvent<Element, Event>, value: string): void => {
			setSearchTerm(value);
			setLoading(searchTerm !== debouncedSearchTerm);
		},
		[searchTerm, debouncedSearchTerm]
	);
	const handleFormSubmit = useCallback(
		(event: FormEvent): void => {
			event.preventDefault();
			dispatch(updateHistory({ url, userId }));
			navigate(`/search/?q=${searchTerm}`);
		},
		[dispatch, searchTerm, url, userId, navigate]
	);
	return (
		<Container maxWidth="sm" sx={{ paddingTop: "20px" }}>
			<Form onSubmit={handleFormSubmit}>
				<Grid container spacing={1} alignItems="center">
					<Grid item xs>
						<Autocomplete
							freeSolo
							value={searchTerm}
							loading={
								loading && debouncedSearchTerm.trim() !== "" && data !== null
							}
							options={
								data && debouncedSearchTerm.trim() !== ""
									? data.map(meal => meal.strMeal)
									: []
							}
							onInputChange={handleSearch}
							filterOptions={x => x}
							renderInput={params => (
								<TextField {...params} label="Search meal" />
							)}
							renderOption={(props, option) => {
								const matchedMeal = data?.find(meal => meal.strMeal === option);
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
