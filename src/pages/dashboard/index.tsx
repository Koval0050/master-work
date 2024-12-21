import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "@/hooks/redux";
import Dashboard from "@/page-components/dashboard/Dashboard";
import SideBar from "@/page-components/dashboard/SideBar";
import {
  deleteCovidDataFile,
  getCovidData,
  postCovidDataFile,
} from "@/redux/dashboard/actions";

export interface FormValues {
  file: FileList; // Поле для завантаження файлу
}

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const [fileId, setFileId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        await dispatch(getCovidData({ token })).unwrap();
      } catch (error) {
        console.error("Помилка при отриманні даних:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleFileId = (id: string) => {
    setFileId(id);
  };

  //Заватаження файлу на сервер
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const token = localStorage.getItem("token");
    const file = data.file[0];
    console.log(file);
    
    if (!token || !file) {
      console.error("Не вдалося отримати токен або файл.");
      return;
    }

    try {
      const response = await postCovidDataFile({ token, file });
      console.log("Файл успішно завантажено!", response);
      await dispatch(getCovidData({ token })).unwrap();
      reset();
    } catch (error) {
      console.error("Помилка завантаження файлу:", error);
    }
  };

  // Видалення файлу з серверу
  const handleDeleteFile = async (fileId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Відсутній токен авторизації!");
      return;
    }

    try {
      await deleteCovidDataFile({ token, fileId });
      alert("Файл успішно видалено!");

      // Оновлення fileId після видалення
      const updatedData = await dispatch(getCovidData({ token })).unwrap();
      const remainingFiles = updatedData.length > 0 ? updatedData[0]._id : ""; // Якщо файли залишились, вибираємо перший
      setFileId(remainingFiles);
    } catch (error) {
      console.error("Помилка видалення файлу:", error);
    }
  };

  return (
    <div className="flex">
      <SideBar
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        activeFileId={fileId}
        handleDeleteFile={handleDeleteFile}
        handleFileId={handleFileId}
      />

      <Dashboard id={fileId} />
    </div>
  );
};

export default DashboardPage;
