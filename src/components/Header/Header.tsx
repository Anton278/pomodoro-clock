import "./Header.scss";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { NavLink } from "../NavLink";
import { selectIsOtherPagesLocked } from "../../redux/timer/selectors";
import { useSelector } from "react-redux";

const Header: FC = () => {
    const isOtherPagesLocked = useSelector(selectIsOtherPagesLocked);

    return (
        <>
            <AppBar position="static" sx={{ height: 64 }}>
                <Toolbar>
                    <Box flexGrow={1} display="flex" alignItems="center">
                        <NavLink to="/">TIMER</NavLink>
                        <NavLink disabled={isOtherPagesLocked} to="/stats">
                            STATISTICS
                        </NavLink>
                        <NavLink disabled={isOtherPagesLocked} to="/settings">
                            SETTINGS
                        </NavLink>
                    </Box>
                    <Box>
                        <IconButton>
                            <AccountCircleOutlinedIcon
                                sx={{ color: "white" }}
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Outlet></Outlet>
        </>
    );
};

export { Header };
