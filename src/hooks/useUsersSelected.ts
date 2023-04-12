import { useState } from "react";
import { UsersWithId } from "../store/users/slice";

export const useUsersSelected = () => {
	const [selectedNames, setSelectedNames] = useState<string[]>([]);

	const isUsersSelected = (users: UsersWithId) =>
		selectedNames.includes(users.name) || selectedNames.length === 0;

	return {
		isUsersSelected,
		selectedNames,
		setSelectedNames,
	};
};
