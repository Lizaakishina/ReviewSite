import { useState } from "react";

const useOpenMenu = (initialValue) => {
  const [isButtonPopup, setIsButtonMenu] = useState(initialValue);
  const handlePopupClick = () => {
    setIsButtonMenu(state => !state);
  }
  return {handlePopupClick, isButtonPopup};
}

export default useOpenMenu;