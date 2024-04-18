import React, { useEffect, useState } from "react";
import axios from "axios";
const CreditModal = ({ isOpen, setIsOpen, id }) => {
  const [client, setClient] = useState({});
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/client/${id}`);
      setClient(response.data);
    })();
  }, []);
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-slate-300">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-red-500 text-xl font-bold"
              >
                &times;
              </button>
            </div>
          </div>
          <div className="p-6">
            <p className="text-lg font-bold mb-4">{client.name}</p>
            <p className="text-sm text-gray-600 mb-2">ID: {client._id}</p>
            <p className="text-sm text-gray-600 mb-2">Email: {client.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditModal;
