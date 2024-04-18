import mongoose from "mongoose";

const commerceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: Number,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Commerce ||
  mongoose.model("Commerce", commerceSchema);
