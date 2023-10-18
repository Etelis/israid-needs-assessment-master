import React from "react";
import { Typography, Link, Breadcrumbs } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom"; // useHistory got replaced by useNavigate in v.6 +
import { useAppSelector } from "../redux/store";
import categories from "../static-data/categories.json";
import subCategories from "../static-data/sub-categories.json";

function BreadcrumbsComponent() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();
  const rnas = useAppSelector((state) => state.Rna.rnas);

  /**
   * creating the crumbs list in entring order
   * @returns crumbs Array of jsx elements
   */
  const getCrumbContent = () => {
    const crumbs = pathnames.map((name, index) => {
      let routeTo = getRoute(pathnames);
      const isLast = index === pathnames.length - 1;

      switch (index) {
        case 1:
          name = getRnaName(rnas, name);
          break;
        case 2:
          name = getCategoryName(name);
          break;
        case 3:
          name = getSubCategoryName(name);
          break;
      }

      // if crumb is last in list he is not clickable
      let crumb = isLast
        ? getTextCrumb(name)
        : getClickableCrumb(name, routeTo);

      return crumb;
    });

    return crumbs;
  };

  const getRoute = (pathnames) => {
    const len = pathnames.length;
    let route;
    if (len <= 1) {
      route = `/RNAs`;
    } else {
      route = `/RNAs/${pathnames[1]}`;
    }
    return route;
  };

  const getRnaName = (rnas, name) => {
    const foundRna = rnas.find((rna) => rna.id === name);
    return foundRna.communityName;
  };

  const getCategoryName = (name) => {
    const foundCategory = categories.find((category) => category.id === name);
    return foundCategory.name;
  };

  const getSubCategoryName = (name) => {
    const foundCategory = subCategories.find(
      (category) => category.id === name
    );
    return foundCategory.name;
  };

  const getClickableCrumb = (name, routeTo) => {
    return (
      <Link
        key={name}
        color="inherit"
        href={routeTo}
        onClick={(event) => {
          handleClick(event, routeTo);
        }}
      >
        {name}
      </Link>
    );
  };

  const getTextCrumb = (name) => {
    return (
      <Typography key={name} color="text.primary">
        {name}
      </Typography>
    );
  };

  const handleClick = (event, routeTo) => {
    event.preventDefault();
    navigate(routeTo);
  };

  return (
    <Breadcrumbs separator={">"} aria-label="breadcrumb">
      {getCrumbContent()}
    </Breadcrumbs>
  );
}

export default BreadcrumbsComponent;
