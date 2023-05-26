import {NavLink} from "react-router-dom";

export const MenuLink = ({to, text}) => {
  return (
    <NavLink
      to={to}
      style={({ isActive, isPending }) => {
        return {
          color: isActive ? "white" : "black",
          textDecoration: 'none'
        };
      }}
    >
      { text }
    </NavLink>
  )
}
