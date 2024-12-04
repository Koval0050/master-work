// import { useState, useCallback, useEffect } from "react";
// import { SwiperClass, SwiperProps } from "swiper/react";
// import SwiperCore from "swiper";

// interface Props {
//   onSwiperCallback?: SwiperProps["onSwiper"];
// }

// export const useSwiperOutside = ({ onSwiperCallback }: Props = {}) => {
//   const [swiper, setSwiper] = useState<SwiperCore>(null);

//   const [isBeginning, setIsBeginning] = useState(true);
//   const [isEnd, setIsEnd] = useState(swiper?.isEnd);

//   const slidePrev = useCallback(() => swiper?.slidePrev(), [swiper]);
//   const slideNext = useCallback(() => swiper?.slideNext(), [swiper]);

//   const updateSwiper = useCallback(
//     (swiperState: SwiperClass, callback?: SwiperProps["onSwiper"]) => {
//       if (swiperState) {
//         setSwiper(swiperState);
//         setIsBeginning(swiperState?.isBeginning);
//         setIsEnd(swiperState?.isEnd);

//         if (callback) {
//           callback(swiperState);
//         }
//       }
//     },
//     [setSwiper]
//   );

//   const onSwiper = useCallback(
//     (swiperState: SwiperClass) => updateSwiper(swiperState, onSwiperCallback),
//     [updateSwiper, onSwiperCallback]
//   );

//   const onSlideChange = useCallback(
//     (swiperState: SwiperClass) => updateSwiper(swiperState),
//     [updateSwiper]
//   );

//   useEffect(() => {
//     setIsBeginning(swiper?.isBeginning);
//   }, [swiper?.isBeginning]);

//   useEffect(() => {
//     setIsEnd(swiper?.isEnd);
//   }, [swiper?.isEnd]);

//   return {
//     isBeginning,
//     isEnd,
//     slidePrev,
//     slideNext,
//     onSwiper,
//     onSlideChange,
//   };
// };
