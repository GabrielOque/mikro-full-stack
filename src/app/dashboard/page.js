"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { HeaderHomeAdmin } from "@/components/HeaderHomeAdmin";
import { useSelector } from "react-redux";
import CreateCreditModal from "@/components/CreateCreditModal";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const [isModalCreatedCredit, setIsModalCreatedCredit] = useState(false);
  const { commerce } = useSelector((state) => state.commerce);
  const [microCredits, setMicroCredits] = useState([]);

  useEffect(() => {
    (async () => {
      console.log("Gabriel");
      const response = await axios.get("/api/micro-credit/all-credits");
      console.log(response.data, "Gabriel");
      setMicroCredits(response.data);
    })();
  }, []);

  const groupedByCommerceName = microCredits.reduce((acc, credit) => {
    const { commerceName, amount } = credit;

    if (acc[commerceName]) {
      acc[commerceName] += amount;
    } else {
      acc[commerceName] = amount;
    }

    return acc;
  }, {});

  let approvedCount = 0;
  let pendingCount = 0;

  microCredits.forEach((credit) => {
    if (credit.status === "Aprobado") {
      approvedCount++;
    } else {
      pendingCount++;
    }
  });

  const totalCredits = approvedCount + pendingCount;
  const approvedPercentage = (approvedCount / totalCredits) * 100;
  const pendingPercentage = (pendingCount / totalCredits) * 100;

  const totalAmount = microCredits.reduce(
    (sum, credit) => sum + credit.amount,
    0
  );
  const averageAmount = totalAmount / microCredits.length;

  const amounts = microCredits.map((credit) => credit.amount);

  const highestAmount = Math.max(...amounts);

  const lowestAmount = Math.min(...amounts);

  const totalAmountCredits = amounts.reduce((sum, amount) => sum + amount, 0);
  const averageAmountCredits = totalAmountCredits / amounts.length;

  return (
    <div className="relative w-full h-screen">
      <HeaderHomeAdmin
        commerce={commerce}
        isModalCreatedCredit={isModalCreatedCredit}
        setIsModalCreatedCredit={setIsModalCreatedCredit}
      />
      <div className="container mx-auto mt-5">
        <h2 className="text-2xl font-bold mb-4">Listado de Microcréditos</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="px-4 py-2">Comercio</th>
                <th className="px-4 py-2">Monto</th>
                <th className="px-4 py-2">Tasa de Interés</th>
                <th className="px-4 py-2">Plazo</th>
                <th className="px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {microCredits.map((microCredit) => (
                <tr
                  key={microCredit._id}
                  className="border-b border-gray-200 text-center"
                >
                  <td className="px-4 py-2">{microCredit.commerceName}</td>
                  <td className="px-4 py-2">{microCredit.amount}</td>
                  <td className="px-4 py-2">{microCredit.interestRate}%</td>
                  <td className="px-4 py-2">{microCredit.term} meses</td>
                  <td className="px-4 py-2">{microCredit.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-bold  mt-10 mb-3">
          Créditos por comercio
        </h2>
        <div className="flex flex-wrap justify-start ">
          {Object.entries(groupedByCommerceName).map(
            ([commerceName, totalAmount], index) => (
              <div
                className="bg-white rounded-lg shadow-md p-4 mr-4"
                key={index}
              >
                <h2 className="text-xl font-semibold">{commerceName}</h2>
                <p className="text-gray-600">
                  Total de créditos: {totalAmount}
                </p>
              </div>
            )
          )}
        </div>
        <h2 className="text-2xl font-bold mt-10 mb-3">Créditos por estado</h2>
        <div className="flex justify-between items-center bg-gray-200 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-lg font-semibold text-green-600">
              {approvedPercentage.toFixed(2)}% Aprobados
            </p>
            <div
              className="h-2 bg-green-400"
              style={{ width: `${approvedPercentage}%` }}
            ></div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-red-600">
              {pendingPercentage.toFixed(2)}% Pendientes
            </p>
            <div
              className="h-2 bg-red-400"
              style={{ width: `${pendingPercentage}%` }}
            ></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-10 mb-3">
          Estadísticas de Crédito
        </h2>
        <div className="bg-white shadow-md rounded-lg p-4 ">
          <div className="container mx-auto">
            <div>
              <p className="text-gray-600">Monto más alto: ${highestAmount}</p>
            </div>
            <div>
              <p className="text-gray-600">Monto más bajo: ${lowestAmount}</p>
            </div>
            <div>
              <p className="text-gray-600">
                Promedio de monto: ${averageAmountCredits.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                Total de prestamos: ${totalAmountCredits.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

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

export default Dashboard;
