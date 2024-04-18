import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMicroCredit } from "@/redux/features/microcredits/microCreditThunks";
import axios from "axios";
const CreateCreditModal = ({
  isModalCreatedCredit,
  setIsModalCreatedCredit,
  idCommerce,
  idClient,
  commerceName,
}) => {
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      client: e.target.client.value,
      commerce: idCommerce,
      amount: e.target.amount.value,
      interestRate: e.target.interestRate.value,
      term: e.target.term.value,
      status: e.target.state.value,
      commerceName,
    };
    e.target.reset();
    dispatch(createMicroCredit(data));
    setIsModalCreatedCredit(false);
  };
  return (
    <div className="absolute lg:top-[50%] lg:left-[38%] lg:w-[500px] h-[500px] bg-slate-300 w-[350px] left-8 bottom-[30%] lg:bottom-0">
      <div className="w-full h-full text-end">
        <button
          className="font-bold text-2xl p-3"
          onClick={() => setIsModalCreatedCredit(false)}
        >
          X
        </button>
        <div>
          <div>
            <h1 className="font-bold text-2xl text-center">Crear un credito</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center px-5 py-5"
          >
            <input
              defaultValue={idClient ? idClient : undefined}
              type="text"
              name="client"
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="identificador del cliente"
            />
            <input
              type="Number"
              name="amount"
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Monto del credito"
            />
            <input
              type="Number"
              name="term"
              required
              placeholder="Plazo del credito en meses"
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="Number"
              required
              name="interestRate"
              placeholder="Tasa de interes en porcentaje"
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <select
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:border-blue-500"
              required
              name="state"
            >
              <option value="">Seleccionar estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
            </select>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mt-5"
            >
              Crear credito
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCreditModal;
