// // import { t } from "i18next";
// import { toast, Id } from "react-toastify";
// import {
//   successfulResponsesTrns,
//   pendingResponsesTrns,
//   errorResponsesTrns,
// } from "@/translate/responses";

// export class NotificationService {
//   static success = (
//     message: string = successfulResponsesTrns.default,
//     messageParams?: Record<string, string | number>
//   ) => toast.success(t(message, messageParams));

//   static loading = (
//     message: string = pendingResponsesTrns.default,
//     messageParams?: Record<string, string | number>
//   ) => toast.loading(t(message, messageParams));

//   static error = (
//     message: string = errorResponsesTrns.default,
//     messageParams?: Record<string, string | number>
//   ) => toast.error(t(message, messageParams));

//   static updateToSuccess = (
//     toastId: Id,
//     message: string = errorResponsesTrns.default,
//     messageParams?: Record<string, string | number>
//   ) =>
//     toast.update(toastId, {
//       type: "success",
//       render: t(message, messageParams),
//       isLoading: false,
//       autoClose: 5000,
//       closeButton: true,
//       closeOnClick: true,
//       draggable: true,
//     });

//   static updateToError = (
//     toastId: Id,
//     message: string = errorResponsesTrns.default,
//     messageParams?: Record<string, string | number>
//   ) =>
//     toast.update(toastId, {
//       type: "error",
//       render: t(message, messageParams),
//       isLoading: false,
//       autoClose: 5000,
//       closeButton: true,
//       closeOnClick: true,
//       draggable: true,
//     });
// }
