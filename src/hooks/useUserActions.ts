import {
	User,
	UserId,
	UserWithId,
	addNewUser,
	deleteUserById,
	editUserById,
} from "../store/users/slice";
import { useAppDispatch, useAppSelector } from "./store";

export const useUserActions = () => {
	//Acciones del usuario
	const dispatch = useAppDispatch();

	const users = useAppSelector((state) => state.users);

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	const getUser = (id: UserId) => {
		return users.find((user) => user.id === id);
	};

	const getAllUsers = () => {
		return users;
	};

	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const editUser = ({ id, name, email, github }: UserWithId) => {
		dispatch(editUserById({ id, name, email, github }));
	};

	return {
		removeUser,
		addUser,
		getUser,
		users,
		getAllUsers,
		editUser,
	};
};
