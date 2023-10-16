import React from "react";
import { Typography, Link, Breadcrumbs } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom"; // useHistory got replaced by useNavigate in v.6 +

function BreadcrumbsComponent() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate(); // Use useNavigate for navigation

  return (
    <Breadcrumbs separator={">"} aria-label="breadcrumb">
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        const handleClick = (event) => {
          event.preventDefault();
          navigate(routeTo); // Use navigate for navigation
        };

        return isLast ? (
          <Typography key={name} color="text.primary">
            {name}
          </Typography>
        ) : (
          <Link
            key={name}
            color="inherit"
            href={routeTo}
            onClick={handleClick} // Attach the click event handler
          >
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadcrumbsComponent;
