import mongoose from "mongoose";

const UserClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
  },
  rol: { type: String, default: "client" },
});

export default mongoose.models.UserClient ||
  mongoose.model("UserClient", UserClientSchema);
