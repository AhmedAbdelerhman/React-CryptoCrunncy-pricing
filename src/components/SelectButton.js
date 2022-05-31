import { Box } from "@mui/material";

const SelectButton = ({ children, selected, onClick }) => {
  const  selectbutton = {
    display:"block",
    
      border: "1px solid gold",
      borderRadius: 5,
      padding: 2,
      paddingLeft: 2,
      paddingRight: 2,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
        margin: "2%",
    }


  return (
    <Box display="inline"  onClick={onClick} sx=  {  {...selectbutton}}>
      {children}
    </Box>
  );
};

export default SelectButton;