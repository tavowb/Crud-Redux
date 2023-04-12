import {
	Badge,
	Card,
	MultiSelectBox,
	MultiSelectBoxItem,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	Title,
} from "@tremor/react";
import { useState } from "react";
import { useAppSelector } from "../hooks/store";
import { useUserActions } from "../hooks/useUserActions";
import { useUsersSelected } from "../hooks/useUsersSelected";
import { CreateNewUser } from "./CreateNewUser";
import { IconDelete, IconEdit, IconMinus, IconPlus } from "./Icons";

export default function ListOfUsers() {
	const users = useAppSelector((state) => state.users);
	const { removeUser } = useUserActions();
	const { selectedNames, setSelectedNames, isUsersSelected } =
		useUsersSelected();
	const [Crear, setCrear] = useState(false);

	const handleCrear = () => {
		setCrear(!Crear);
	};

	const handleEdit = () => {
		//falta
	};

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
										<button type="button" onClick={handleEdit}>
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
			<div className="pt-6 pb-6 flex items-center justify-center ">
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
		</>
	);
}
