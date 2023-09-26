import { useState } from "react";

const useOpenPopup = () => {
  const [isError, setIsError] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const handleOpenPopup = (message, boolean) => {
    setIsError(boolean)
    setIsOpen(true);
    setErrorMessage(message);
    window.addEventListener("keydown", handleKeyClose);
  }

  function handleClosePopup () {
    window.removeEventListener("keydown", handleKeyClose);
    setIsOpen(false);
    setTimeout(() => {setErrorMessage('');}, "500");
  }

  function handleCLoseOverlay (e) {
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  }

  function handleKeyClose (e) {
    (e.key === "Escape") && handleClosePopup();
  }

  return {handleOpenPopup, handleClosePopup, handleCLoseOverlay, isOpen, errorMessage, isError};
}

export default useOpenPopup;