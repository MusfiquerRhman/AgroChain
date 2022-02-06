// MaterialUI Elements
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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import {Link} from 'react-router-dom';

import {DrawerHeader} from "../../styles/navbarStyles";


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
						<DashboardIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
					<Link to="/" >Dashboard</Link>
					</Typography>
				</ListItem>
			</List>
			<Divider />

			<List>
				<ListItem button key={"AddProducs"}>
					<ListItemIcon>
						<AddShoppingCartIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
					<Link to="/Avater/AddProducts" >Add Products</Link>
					</Typography>
				</ListItem>

				<ListItem button key={"Producs"}>
					<ListItemIcon>
						<ConstructionIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
					<Link to="/" >Manage Products</Link>
					</Typography>
				</ListItem>
			</List>
			<Divider />

			<List>
				<ListItem button key={"orders"}>
					<ListItemIcon>
						<ShopIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
					>
					<Link to="/Avater/Orders" >Orders</Link>
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
					<Link to="/" >History</Link>
					</Typography>
				</ListItem>
			</List>
			<Divider />

			<List>
				<ListItem button key={"Employees"}>
					<ListItemIcon>
						<AdminPanelSettingsIcon color="primary"/>
					</ListItemIcon>
					<Typography
						variant="h6"
						component="div"
						sx={{ display: { sm: 'block' } }}
						>
					<Link to="/" >Employees</Link>
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
					<Link to="/" >Customers</Link>
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
						<Link to="/avater/seasons" >Seasons</Link>
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
						<Link to="/" >Tags</Link>
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
						<Link to="/" >What's New?</Link>
					</Typography>
				</ListItem>
			</List>

      	</Drawer>
    )
}
