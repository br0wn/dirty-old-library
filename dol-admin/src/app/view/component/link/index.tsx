import React from 'react';
import { NavLink as RouterNavLink, NavLinkProps as RouterLinkProps } from 'react-router-dom';

export const NavLink = React.forwardRef<any, RouterLinkProps>((props, ref) => (
	<RouterNavLink {...props} activeClassName="Mui-selected" ref={ref}/>
));
