"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserAccount } from "@/redux/features/user/userThunks";
import { useDispatch, useSelector } from "react-redux";
const CreateAccount = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuth, status, user } = useSelector((state) => state.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    e.target.reset();
    dispatch(createUserAccount({ name, email, password }));
  };

  useEffect(() => {
    if (status === "success") {
      router.push("/home");
    }
  }, [status, router, user]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="lg:w-1/3 w-full flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl lg:text-4xl px-5 text-center">
          Vienvenido a su comercio MICRO-CREDIT
        </h1>
        <form onSubmit={handleSubmit} className="lg:w-[500px] w-[300px] mt-10">
          <div className="mb-4">
            <input
              placeholder="Nombre completo"
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Correo electronico"
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Contraseña"
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
