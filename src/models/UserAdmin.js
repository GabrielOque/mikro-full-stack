import mongoose from "mongoose";

const UserAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
  },
  commerce: { type: mongoose.Schema.Types.ObjectId, ref: "Commerce" },
  rol: { type: String, default: "admin" },
});

export default mongoose.models.UserAdmin ||
  mongoose.model("UserAdmin", UserAdminSchema);
