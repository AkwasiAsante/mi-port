import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { getPosts } from "../../redux/apiCalls/postApiCalls";
import { getProfiles } from "../../redux/apiCalls/profileApiCalls";

const Paginate = ({ page, type }) => {
  const { numberOfPages } = useSelector((state) =>
    type === "people" ? state.profiles : state.posts
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (page) {
      type === "people"
        ? getProfiles(page, dispatch)
        : getPosts(page, dispatch);
    }
  }, [dispatch, page, type]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant='outlined'
      color='primary'
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={
            type === "people"
              ? `/profiles?page=${item.page}`
              : `/posts?page=${item.page}`
          }
        />
      )}
    />
  );
};

export default Paginate;
