import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/user/userSilce";
import { resetCommerces } from "@/redux/features/commerces/commerceSlice";
import { resetCredits } from "@/redux/features/microcredits/microCreditSlice";
import Link from "next/link";
export const HeaderHomeAdmin = ({
  commerce,
  isModalCreatedCredit,
  setIsModalCreatedCredit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <header className="bg-gray-800 text-white w-full flex justify-between p-4 items-center">
      <div className="flex items-center">
        <Link href="/home">
          <img className="w-40" src={commerce.banner} />
        </Link>
        <p className="font-bold ml-5 text-2xl">{commerce.name}</p>
        <button
          className="ml-5 bg-white px-3 py-1 h-10 text-black rounded-lg lg:block hidden"
          onClick={() => {
            setIsModalCreatedCredit(true);
          }}
        >
          Crear un credito
        </button>
        <button
          className="ml-5 bg-white px-3 py-1 h-10 text-black rounded-lg lg:block hidden"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Analisis de creditos
        </button>
      </div>
      <div className="lg:block hidden">
        <div className="flex">
          <div>
            <p>{commerce.email}</p>
            <p>{commerce.tel}</p>
          </div>
          <button
            className="ml-10 bg-white px-3 py-1 h-10 text-black rounded-lg"
            onClick={() => {
              dispatch(logout());
              dispatch(resetCommerces());
              dispatch(resetCredits());
              router.push("/");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="lg:hidden block" onClick={() => setIsOpen(!isOpen)}>
        <img
          className="w-10 h-10"
          src="https://w7.pngwing.com/pngs/451/380/png-transparent-hamburger-button-computer-icons-menu-menu-rectangle-desktop-wallpaper-button.png"
        />
      </div>
      {isOpen && (
        <div className="bg-gray-800 absolute w-[100%] left-0 top-0 h-[200px] z-10 text-white font-bold px-5 text-xl">
          <div className="w-full text-end font-bold text-xl">
            <button onClick={() => setIsOpen(!isOpen)} className="p-3">
              X
            </button>
          </div>
          <button
            className="block mb-2"
            onClick={() => {
              setIsModalCreatedCredit(true);
            }}
          >
            Crear un crédito
          </button>
          <button
            className="block mb-2"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Análisis de créditos
          </button>
          <button
            className=" block"
            onClick={() => {
              dispatch(logout());
              dispatch(resetCommerces());
              dispatch(resetCredits());
              router.push("/");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
};
