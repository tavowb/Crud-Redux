import { useState } from "react";
import { toast } from "sonner";
import { UserId, UserWithId } from "../store/users/slice";
import { useUserActions } from "./useUserActions";

export const useListOfUsers = () => {
	const { removeUser, getUser, users, editUser } = useUserActions();

	const [userEdit, setUserEdit] = useState<UserWithId>();
	const [Crear, setCrear] = useState(false);
	const [Editar, setEditar] = useState(false);

	const handleEditar = (id: UserId) => {
		if (Crear) {
			setCrear(!Crear);
		}
		const user = getUser(id);
		setUserEdit(user);
		setEditar(!Editar);
	};

	const handleCrear = () => {
		if (Editar) {
			setEditar(!Editar);
		}
		setCrear(!Crear);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const id = userEdit?.id;
		const form = event.currentTarget;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		// Validar los datos
		if (!name || !email || !github) {
			toast.error("Error al editar usuario");
			return;
		}

		editUser({ id, name, email, github } as UserWithId);
		setEditar(!Editar);
		toast.success("Se edito al usuario");
		form.reset();
	};

	const changeEdit = () => {
		setEditar(!Editar);
	};

	return {
		removeUser,
		getUser,
		users,
		editUser,
		handleEditar,
		handleCrear,
		handleSubmit,
		userEdit,
		Crear,
		Editar,
		changeEdit,
	};
};
