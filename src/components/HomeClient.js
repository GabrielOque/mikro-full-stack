import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCommerces } from "@/redux/features/commerces/commerceThunks";
import { logout } from "@/redux/features/user/userSilce";
import CreateCreditModal from "./CreateCreditModal";

export const HomeClient = () => {
  const router = useRouter();
  const [microcredits, setMicrocredits] = useState([]);
  const [isModalCreatedCredit, setIsModalCreatedCredit] = useState(false);
  const [idCommerce, setIdCommerce] = useState("");
  const [commerceName, setCommerceName] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { commerces, status } = useSelector((state) => state.commerce);

  useEffect(() => {
    (async () => {
      dispatch(getCommerces());
      const response = await axios.get(`/api/micro-credit/credits/${user._id}`);
      setMicrocredits(response.data);
    })();
  }, [isModalCreatedCredit]);
  return (
    <div className="relative">
      <header className="bg-gray-800 text-white w-full flex justify-between p-4 items-center">
        <p className="font-bold ml-5 text-2xl">{user.name}</p>
        <div className="flex items-center">
          <p className="lg:block hidden">{user.email}</p>
          <button
            className="ml-5 bg-white px-3 py-1 h-10 text-black rounded-lg"
            onClick={() => {
              router.push("/");
              dispatch(logout());
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <div className="flex">
          <div className="flex flex-wrap justify-start gap-4 lg:w-3/4 p-4 w-full">
            {commerces.map((commerce) => (
              <div
                onClick={() => {
                  setIsModalCreatedCredit(true);
                  setIdCommerce(commerce._id);
                  setCommerceName(commerce.name);
                }}
                className="bg-white shadow-md rounded-lg overflow-hidden mt-10 cursor-pointer w-[400px]"
                key={commerce._id}
              >
                <img
                  className="w-full h-32 object-cover object-center"
                  src={commerce.banner}
                  alt="Commerce Banner"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {commerce.name}
                  </h2>
                  <p className="text-gray-700">Email: {commerce.email}</p>
                  <p className="text-gray-700">Teléfono: {commerce.tel}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:block hidden w-1/4 mt-10 pr-5 overflow-y-auto max-h-[750px]">
            <h1 className="text-center font-bold text-2xl">Mis creditos</h1>
            {microcredits.map((microcredit) => (
              <div
                className="bg-white shadow-md rounded-lg overflow-hidden mt-4"
                key={microcredit._id}
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {microcredit.commerceName}
                  </h2>
                  <p className="text-gray-700">
                    Monto: ${microcredit.amount} - Plazo: {microcredit.term}{" "}
                    mes/es
                  </p>
                  <p className="text-gray-700">Estado: {microcredit.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isModalCreatedCredit && (
        <CreateCreditModal
          isModalCreatedCredit={isModalCreatedCredit}
          setIsModalCreatedCredit={setIsModalCreatedCredit}
          idCommerce={idCommerce}
          idClient={user._id}
          commerceName={commerceName}
        />
      )}
    </div>
  );
};
