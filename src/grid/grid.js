const grid = (Xs = "", Sm = "", Md = "", Lg = "", moreStyle = {}) => {
  return { display: { xs: Xs, sm: Sm, md: Md, lg: Lg }, ...moreStyle };
};

export default grid 