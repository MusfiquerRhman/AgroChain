import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import DesktopAccessDisabledIcon from "@mui/icons-material/DesktopAccessDisabled";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import manageProductsStyle from "../../../styles/manageProductsStyle";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function MediaControlCard(products) {
	const [style, setStyle] = useState("");

	const {
		ADDED_AT,
		ADMIN_ID,
		IS_AVAILABLE,
		PRODUCT_AGRO_PRICE,
		PRODUCT_DETAILS,
		PRODUCT_ID,
		PRODUCT_IMG,
		PRODUCT_IN_STOCK_QUANTITY,
		PRODUCT_MEASUREMENT_UNIT,
		PRODUCT_NAME_BN,
		PRODUCT_NAME_EN,
	} = products;
	const theme = useTheme();
	const classes = manageProductsStyle();

	useEffect(() => {
		if (!IS_AVAILABLE) {
		setStyle(theme.palette.secondary.main);
		} else if (PRODUCT_IN_STOCK_QUANTITY <= 0) {
		setStyle(theme.palette.error.main);
		} else if (IS_AVAILABLE && PRODUCT_IN_STOCK_QUANTITY > 0) {
		setStyle(theme.palette.primary.main);
		}
	}, [IS_AVAILABLE, PRODUCT_IN_STOCK_QUANTITY]);

	return (
		<Card
			sx={{
				display: "flex",
				marginTop: "1rem",
				borderRight: `5px solid ${style}`,
			}}
		>
			<CardMedia
				component="img"
				sx={{ width: 151 }}
				image={`/img/${PRODUCT_IMG}`}
				alt="Live from space album cover"
			/>
			<Box className={classes.cardBox} sx={{ color: style }}>
				<CardContent sx={{ flex: "1 0 auto" }}>
					<Typography component="div" variant="h5">
						{PRODUCT_NAME_EN} - {PRODUCT_NAME_BN}
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						In stock: {PRODUCT_IN_STOCK_QUANTITY} {PRODUCT_MEASUREMENT_UNIT} (
						{IS_AVAILABLE ? "Enabled" : "Disabled"})
					</Typography>
					<Typography
						variant="subtitle1"
						color="text.secondary"
						component="div"
					>
						Price: {PRODUCT_AGRO_PRICE} tk per {PRODUCT_MEASUREMENT_UNIT}
					</Typography>
				</CardContent>
				<Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 1 }}>
					<Stack spacing={2} direction="row">
						<Button
							size="small"
							variant="outlined"
							startIcon={<DesktopAccessDisabledIcon />}
							color={IS_AVAILABLE ? 'secondary' : 'primary'}
						>
						{IS_AVAILABLE ? "Disable" : "Enable"}
						</Button>
						<Button
							size="small"
							variant="outlined"
							startIcon={<EditIcon />}
							color="info"
						>
						Edit
						</Button>
						<Button
							size="small"
							variant="outlined"
							startIcon={<DeleteForeverIcon />}
							color="error"
						>
						Delete
						</Button>
					</Stack>
				</Box>
			</Box>
		</Card>
	);
}
