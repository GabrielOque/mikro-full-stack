import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSilce";
import commerceReducer from "./features/commerces/commerceSlice";
import microCreditReducer from "./features/microcredits/microCreditSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    commerce: commerceReducer,
    microcredit: microCreditReducer,
  },
});
