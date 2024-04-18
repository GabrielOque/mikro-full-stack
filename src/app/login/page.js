"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { login } from "../../redux/features/user/userThunks";

const Login = () => {
  const [isLoginFaild, setIsLoginFaild] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth, status, user } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    e.target.reset();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (user?._id && status === "success") {
      router.push("/home");
    }
    if (status === "success" && !user?._id) {
      setIsLoginFaild(true);
    }
  }, [status, router, user]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="lg:w-1/3 w-full flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl lg:text-4xl px-5 text-center">
          Vienvenido a su comercio MICRO-CREDIT
        </h1>
        <form onSubmit={handleSubmit} className="lg:w-[500px] w-[300px] mt-10">
          <div className="mb-4 ">
            <input
              placeholder="Correo electronico"
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 ">
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
            Iniciar sesión
          </button>
          {status === "loading" && <p className="text-red-500">Cargando...</p>}
        </form>
        {isLoginFaild && (
          <p className="text-red-500 mt-4">Correo o contraseña incorrectos</p>
        )}
      </div>
    </div>
  );
};

export default Login;
