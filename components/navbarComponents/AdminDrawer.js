import ListItemIcon from '@mui/material/ListItemIcon';
import ConstructionIcon from '@mui/icons-material/Construction';
import ShopIcon from '@mui/icons-material/Shop';
import HistoryIcon from '@mui/icons-material/History';
import TimelineIcon from '@mui/icons-material/Timeline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {DrawerHeader} from "../../styles/navbarStyles";
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from "next/link"

const drawerWidth = 240;

export default function AdminDrawer({handleDrawerClose, open}){
  	const theme = useTheme();
    return(
      	<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
      	>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose} color="primary">
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />

			<List>
				<ListItem button key={"Producs"}>
					<ListItemIcon>
						<ConstructionIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
					<Link href="/Avater/AddProducts" ><a>Products</a></Link>
					</Typography>
				</ListItem>

				<ListItem button key={"orders"}>
					<ListItemIcon>
						<ShopIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
					<Link href="/" ><a>Orders</a></Link>
					</Typography>
				</ListItem>

				<ListItem button key={"history"}>
					<ListItemIcon>
						<HistoryIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
						>
					<Link href="/" ><a>History</a></Link>
					</Typography>
				</ListItem>

				<ListItem button key={"customer"}>
					<ListItemIcon>
						<PeopleAltIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
						>
					<Link href="/" ><a>Customers</a></Link>
					</Typography>
				</ListItem>
			</List>
			<Divider />

			<List>
				<ListItem button key={"seasons"}>
					<ListItemIcon>
						<DateRangeIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
						<Link href="/" ><a>Seasons</a></Link>
					</Typography>
				</ListItem>
				
				<ListItem button key={"tag"}>
					<ListItemIcon>
						<LoyaltyIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
						<Link href="/" ><a>Tags</a></Link>
					</Typography>
				</ListItem>
			</List>

			<Divider />
			<List>
				<ListItem button key={"whatsnew"}>
					<ListItemIcon>
						<TimelineIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
						<Link href="/" ><a>What's New?</a></Link>
					</Typography>
				</ListItem>
			</List>


      	</Drawer>
    )
}
