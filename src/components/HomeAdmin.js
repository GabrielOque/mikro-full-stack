import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMicroCredits } from "@/redux/features/microcredits/microCreditThunks";
import { updateCredits } from "@/redux/features/microcredits/microCreditSlice";
import CreditModal from "./CreditModal";
import CreateCreditModal from "./CreateCreditModal";

import axios from "axios";
import { HeaderHomeAdmin } from "./HeaderHomeAdmin";

export const HomeAdmin = ({ commerce }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalCreatedCredit, setIsModalCreatedCredit] = useState(false);
  const [idCredit, setIdCredit] = useState(null);
  const dispatch = useDispatch();
  const { credits, status } = useSelector((state) => state.microcredit);
  useEffect(() => {
    dispatch(getMicroCredits(commerce._id));
  }, []);

  const handleState = async (e, id) => {
    const data = {
      status: "",
    };
    if (e.target.checked) {
      data.status = "Aprobado";
    } else {
      data.status = "Pendiente";
    }
    const response = await axios.put(`/api/micro-credit/${id}`, data);
    const newcredits = credits.map((credit) =>
      credit._id === id ? response.data : credit
    );
    console.log(data);
    dispatch(updateCredits(newcredits));
  };

  const getDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  };
  return (
    <div className="relative">
      <HeaderHomeAdmin
        commerce={commerce}
        isModalCreatedCredit={isModalCreatedCredit}
        setIsModalCreatedCredit={setIsModalCreatedCredit}
      />
      <div className="w-full p-8">
        <h2 className="text-2xl">Bienvenido a tu panel de administración</h2>
        <p className="text-lg">Aquí podrás ver y administrar tus productos</p>
      </div>
      <div>
        <h2 className="text-2xl px-8">Microcréditos</h2>
        {status === "loading" && <p>Cargando...</p>}
        {status === "failed" && <p>Error al cargar los microcréditos</p>}
        {!Array.isArray(credits) && <p>No hay microcréditos disponibles</p>}
        {status === "success" && (
          <div className="flex flex-wrap gap-6 px-8 pt-4 justify-start">
            {credits.map((credit, index) => (
              <div
                className="bg-white p-4 shadow-md rounded-md transition duration-300 transform hover:scale-105 w-[300px]"
                key={index}
              >
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setIdCredit(credit.client);
                    setIsOpen(true);
                  }}
                >
                  <p className="font-bold text-gray-800">
                    Estado: {credit.status}
                  </p>
                  <p className="text-gray-600">
                    Monto del credito: $ {credit.amount}
                  </p>
                  <p className="text-gray-600">
                    Tasa de interes: {credit.interestRate} %
                  </p>
                  <p className="text-gray-600">
                    Plazo del credito: {credit.term} mese/s
                  </p>
                  <p className="text-gray-600">
                    Fecha de inicio: {getDate(credit.startDate)}
                  </p>
                  <p className="text-gray-600">
                    Pago mensual: $ {credit.monthlyPayment}
                  </p>
                  <p className="text-gray-600">
                    Total a pagar: $ {credit.totalAmountDue}
                  </p>
                </div>
                <div className="flex mt-3">
                  <p className="mr-2 font-bold">Aprobar</p>
                  <input
                    checked={credit.status === "Aprobado" ? true : false}
                    onChange={(e) => {
                      handleState(e, credit._id);
                    }}
                    className="w-4"
                    type="checkbox"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isOpen && (
        <CreditModal isOpen={isOpen} setIsOpen={setIsOpen} id={idCredit} />
      )}
      {isModalCreatedCredit && (
        <CreateCreditModal
          isModalCreatedCredit={isModalCreatedCredit}
          setIsModalCreatedCredit={setIsModalCreatedCredit}
          idCommerce={commerce._id}
          commerceName={commerce.name}
        />
      )}
    </div>
  );
};

export default HomeAdmin;
