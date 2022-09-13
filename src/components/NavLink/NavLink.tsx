import "./NavLink.scss";
import { FC } from "react";
import { NavLink as Link } from "react-router-dom";
import { Button } from "@mui/material";

type NavLinkProps = {
    to: string;
    disabled?: boolean;
    children: string;
};

const NavLink: FC<NavLinkProps> = ({ to, disabled, children }) => {
    const activeStyles = {
        textDecoration: "underline",
    };

    return disabled ? (
        <Button disabled={disabled} sx={{ ml: "1rem", p: 0 }}>
            {children}
        </Button>
    ) : (
        <Link
            className="nav-link"
            style={({ isActive }) => (isActive ? activeStyles : {})}
            to={to}
        >
            {children}
        </Link>
    );
};

export { NavLink };
