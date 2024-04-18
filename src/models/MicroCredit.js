import mongoose from "mongoose";

const microCreditSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "UserClient" },
  commerce: { type: mongoose.Schema.Types.ObjectId, ref: "Commerce" },
  commerceName: { type: String, required: true }, // Nombre del comercio
  amount: { type: Number, required: true }, // Monto del crédito solicitado
  interestRate: { type: Number, required: true }, // Tasa de interés del crédito en porcentaje
  term: { type: Number, required: true }, // Plazo del crédito en meses
  startDate: { type: Date, default: Date.now }, // Fecha de inicio del crédito
  status: {
    type: String,
    default: "Pendiente",
  }, // Estado del crédito

  // Datos calculados automáticamente
  monthlyPayment: { type: Number }, // Pago mensual calculado automáticamente
  totalAmountDue: { type: Number }, // Monto total a pagar (incluyendo interés) calculado automáticamente
});

export default mongoose.models.MicroCredit ||
  mongoose.model("MicroCredit", microCreditSchema);
