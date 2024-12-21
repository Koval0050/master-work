import React, { useEffect, useState } from "react";
import cn from "classnames";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/redux";
import { selectorCovidDataData } from "@/redux/dashboard/selector";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UseFormRegister, FieldErrors, SubmitHandler } from "react-hook-form";
import { FormValues } from "@/pages/dashboard";

interface DecodedToken extends JwtPayload {
  name: string;
}

interface SideBarProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  handleSubmit: (
    callback: SubmitHandler<FormValues>,
  ) => (e?: React.BaseSyntheticEvent) => void;
  activeFileId: string;
  handleDeleteFile: (id: string) => void;
  handleFileId: (id: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  register,
  errors,
  onSubmit,
  handleSubmit,
  activeFileId,
  handleDeleteFile,
  handleFileId,
}) => {
  const [userName, setUserName] = useState<string | null>(null);

  const router = useRouter();
  const fileList = useAppSelector(selectorCovidDataData);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserName(decoded.name);
      } catch (error) {
        console.error("Не вдалося розшифрувати токен", error);
      }
    }
  }, []);

  // функція logOut
  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  // функція для форматування поля uploadedAt
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Додаємо 0 перед місяцем, якщо менше 10
    const day = date.getDate().toString().padStart(2, "0"); // Додаємо 0 перед днем, якщо менше 10
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="h-screen w-[30%] bg-gradient-to-r from-blue-500 to-cyan-500 py-10 pl-8 pr-1">
      <div className="mb-10 flex gap-x-4">
        <p className="text-3xl capitalize">
          {userName ? userName : "Завантаження..."}
        </p>
        <button onClick={handleLogOut}>log out</button>
      </div>

      <div className="custom-scrollbar flex  flex-col gap-y-5  pr-2">
        {fileList?.map((item) => {
          return (
            <div className="flex gap-x-1" key={item._id}>
              <div
                className={cn(
                  "w-full cursor-pointer rounded-md border border-cyan-100 px-2 py-2 transition-all hover:border-yellow-500",
                  {
                    "border-yellow-500 bg-yellow-200":
                      activeFileId === item._id,
                  },
                )}
                onClick={() => {
                  handleFileId(item._id);
                }}>
                <p className="flex flex-col gap-y-1">
                  <span>{item.fileName}</span>
                  <span>{formatDate(item.uploadedAt)}</span>
                </p>
              </div>

              <button
                className="flex items-center justify-center border p-2 text-xl font-medium hover:bg-red-500 hover:text-white-base"
                onClick={() => handleDeleteFile(item._id)}>
                x
              </button>
            </div>
          );
        })}

        <div className="mb-10 flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-4 rounded-md border border-gray-300 px-4 py-6">
            <input
              type="file"
              {...register("file", {
                required: "Файл обов'язковий для завантаження",
              })}
              className="block w-min cursor-pointer rounded-lg border border-gray-300 text-sm text-gray-900 focus:outline-none"
            />
            {errors.file && (
              <p className="text-sm text-red-500">{errors.file.message}</p>
            )}

            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-slate-50 hover:bg-blue-600">
              Завантажити файл
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
