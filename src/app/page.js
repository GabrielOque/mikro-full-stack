import Link from "next/link";
const Login = () => {
  return (
    <div className="w-full lg:flex flex-row h-screen">
      <div className="lg:w-1/2 flex justify-center items-center">
        <img
          className="w-auto h-4/5 object-fill"
          src="https://resources.cdn.seon.io/uploads/2023/04/High_Risk_Customers_in_online_lending-30.png"
          alt="dont render"
        />
      </div>
      <div className="lg:w-1/2 flex flex-col justify-center items-center w-full">
        <h1 className="font-bold text-2xl lg:mb-10 mb-3 lg:text-4xl">
          Bienvenidos a MICRO-CREDIT
        </h1>
        <div className="lg:px-40 px-10 text-xl">
          <p>
            Somos una compañía enfocada en entender las necesidades financieras
            desde el punto de vista tecnológico para desarrollar soluciones a la
            medida que permitan mejorar la competitividad de nuestros aliados.
          </p>
        </div>
        <div className="lg:mt-26 mt-16 text-white flex flex-col items-center justify-center w-full">
          <div className="mb-10 w-full text-center">
            <Link
              className="rounded-lg bg-blue-500 py-3 px-12 hover:bg-blue-600"
              href="login"
            >
              Iniciar sesión
            </Link>
          </div>
          <div className="w-full text-center">
            <Link
              className="rounded-lg bg-blue-500 py-3 px-12 hover:bg-blue-600"
              href="create-account"
            >
              Crear una cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
