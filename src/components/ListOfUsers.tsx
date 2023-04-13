import {
	Badge,
	Button,
	Card,
	MultiSelectBox,
	MultiSelectBoxItem,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TextInput,
	Title,
} from "@tremor/react";
import { useListOfUsers } from "../hooks/useListOfUsers";
import { useUsersSelected } from "../hooks/useUsersSelected";
import { CreateNewUser } from "./CreateNewUser";
import { IconDelete, IconEdit, IconMinus, IconPlus } from "./Icons";

export default function ListOfUsers() {
	const {
		handleEditar,
		handleCrear,
		handleSubmit,
		Editar,
		userEdit,
		changeEdit,
		Crear,
		users,
		removeUser,
	} = useListOfUsers();
	const { selectedNames, setSelectedNames, isUsersSelected } =
		useUsersSelected();

	return (
		<>
			<Card>
				<Title>
					Usuarios
					{selectedNames.length === 0 ? (
						<Badge style={{ marginLeft: "8px" }}> {users.length} </Badge>
					) : (
						<Badge style={{ marginLeft: "8px" }}>
							{" "}
							{selectedNames.length}{" "}
						</Badge>
					)}
				</Title>
				<MultiSelectBox
					style={{ marginTop: "8px" }}
					onValueChange={(value) => setSelectedNames(value)}
					placeholder="Seleccione el usuario"
					className="max-w-xs"
				>
					{users.map((item) => (
						<MultiSelectBoxItem
							key={item.name}
							value={item.name}
							text={item.name}
						/>
					))}
				</MultiSelectBox>
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell>Id </TableHeaderCell>
							<TableHeaderCell> Nombre </TableHeaderCell>
							<TableHeaderCell> Email </TableHeaderCell>
							<TableHeaderCell> Aciones </TableHeaderCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{users
							.filter((item) => isUsersSelected(item))
							.map((item) => (
								<TableRow key={item.name}>
									<TableCell>{item.id}</TableCell>
									<TableCell style={{ display: "flex", alignItems: "center" }}>
										<img
											src={`https://unavatar.io/github/${item.name}`}
											alt={item.name}
											style={{
												width: "32px",
												height: "32px",
												borderRadius: "50%",
												marginRight: "8px",
											}}
										/>
										{item.name}
									</TableCell>
									<TableCell>{item.email}</TableCell>
									<TableCell>
										<button type="button" onClick={() => handleEditar(item.id)}>
											{" "}
											<IconEdit />{" "}
										</button>
										<button onClick={() => removeUser(item.id)} type="button">
											<IconDelete />
										</button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</Card>
			<div className="pt-6 pb-6 flex items-center justify-center">
				{!Crear ? (
					<div>
						<button
							className="rounded-full h-16 w-16  flex items-center justify-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 "
							onClick={handleCrear}
						>
							<IconPlus />
						</button>
					</div>
				) : (
					<div className="w-full">
						<div className="flex items-center justify-center w-auto">
							<button
								className="rounded-full h-16 w-16  flex items-center justify-center bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 "
								onClick={handleCrear}
							>
								<IconMinus />
							</button>
						</div>

						<div>
							<CreateNewUser />
						</div>
					</div>
				)}
			</div>
			<div className="pt-6 pb-6 flex items-center justify-center">
				{Editar && (
					<Card style={{ marginTop: "16px" }}>
						<Title className="text-center">Edit User</Title>

						<form onSubmit={handleSubmit} className="">
							<TextInput
								name="name"
								defaultValue={userEdit?.name}
								placeholder="name"
							/>
							<TextInput
								name="email"
								defaultValue={userEdit?.email}
								placeholder="email"
							/>
							<TextInput
								name="github"
								defaultValue={userEdit?.github}
								placeholder="github"
							/>

							<div className="text-center">
								<Button
									className="bg-green-500 hover:bg-green-700"
									type="submit"
									style={{ marginTop: "16px", marginRight: "5px" }}
								>
									Guardar cambios
								</Button>
								<Button
									className="bg-red-500 hover:bg-red-700"
									onClick={changeEdit}
									style={{ marginTop: "16px" }}
								>
									Cancelar
								</Button>
							</div>
						</form>
					</Card>
				)}
			</div>
		</>
	);
}
