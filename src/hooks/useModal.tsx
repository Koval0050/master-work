// import { useState, useCallback } from "react";
// import Cookies from "js-cookie";

// export const useModal = (isOpen: boolean = false, cookiesKeyModal?: string) => {
//   const cookiesIsShownModal = Cookies.get(cookiesKeyModal);

//   const [isOpenModal, setIsOpenModal] = useState(
//     cookiesIsShownModal !== "false" && isOpen
//   );

//   const openModal = () => setIsOpenModal(true);

//   const closeModal = useCallback(() => {
//     setIsOpenModal(false);

//     if (cookiesKeyModal) {
//       Cookies.set(cookiesKeyModal, "false");
//     }
//   }, [cookiesKeyModal]);

//   return { isOpenModal, openModal, closeModal };
// };
