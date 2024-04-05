// import { usePermission } from '@hooks/usePermission';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { List, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMatch, useNavigate } from 'react-router-dom';
import useSideBarStyle from './SideBar.style';

function SideBar() {
    const { classes } = useSideBarStyle();
    const { t } = useTranslation();
    // const { canManageTeam } = usePermission();
    const navigate = useNavigate();

    const listItems = [
        {
            icon: DashboardOutlinedIcon,
            text: t('titles.overview'),
            path: '/',
        },
        {
            icon: PhotoCameraIcon,
            text: t('titles.photos'),
            path: '/photos',
        },
    ];

    return (
        <List aria-label="main folders" className={classes.list} component="nav">
            {listItems.map(({ icon, text, path }) => {
                return (
                    <ListItem
                        key={text}
                        className={`${classes.navLink} ${useMatch(path) && classes.navLinkActive}`}
                        component="span"
                        button
                        onClick={() => navigate(path)}
                    >
                        <ListItemIcon>
                            <SvgIcon className={classes.listItemIcon} component={icon} viewBox="0 0 24 24" />
                        </ListItemIcon>
                        <div className={classes.nameContainer}>
                            <ListItemText primary={text} primaryTypographyProps={{ className: classes.listItemText }} />
                        </div>
                    </ListItem>
                );
            })}
        </List>
    );
}

export default SideBar;
