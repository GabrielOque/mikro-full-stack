"use client";
import { useSelector, useDispatch } from "react-redux";
import { getCommerce } from "@/redux/features/user/userThunks";
import { useEffect, useState } from "react";
import { HomeAdmin } from "@/components/HomeAdmin";
import { useRouter } from "next/navigation";
import { HomeClient } from "@/components/HomeClient";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { commerce, status } = useSelector((state) => state.commerce);

  useEffect(() => {
    if (
      user &&
      user.rol === "admin" &&
      status !== "success" &&
      status !== "failed"
    ) {
      dispatch(getCommerce(user.commerce));
    }
  }, [user, status, dispatch]);

  useEffect(() => {
    if (status === "success" && user && user.rol === "admin") {
      setIsLoading(false);
    }
  }, [status, user]);

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  if (user.rol === "admin") {
    return (
      <div>
        {isLoading ? <div>Loading...</div> : <HomeAdmin commerce={commerce} />}
      </div>
    );
  }

  if (user.rol === "client") {
    return (
      <div>
        <HomeClient />
      </div>
    );
  }

  return <p>Usuario no encontrado</p>;
};

export default Home;
