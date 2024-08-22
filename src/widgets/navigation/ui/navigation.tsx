import { NavLink } from "react-router-dom";

export const NavigationPanel = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/application/category">Bot category</NavLink>
                </li>
                <li>
                    <NavLink to="/application/functionality">
                        Functionality
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/application/conditions">
                        Work conditions
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
