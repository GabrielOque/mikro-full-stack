import { NextResponse } from "next/server";
import { conectDB } from "@/libs/mongoose";
import MicroCredit from "@/models/MicroCredit";

export async function POST(request) {
  try {
    await conectDB();
    const {
      client,
      commerce,
      amount,
      interestRate,
      term,
      status,
      commerceName,
    } = await request.json();
    const monthlyInterestRate = interestRate / 100 / 12; // Tasa de interés mensual
    const numberOfPayments = term; // Número de pagos mensuales

    // Fórmula para calcular el pago mensual (cuota fija)
    const monthlyPayment1 =
      (amount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    // Fórmula para calcular el monto total a pagar (incluyendo interés)
    const totalAmountDue1 = monthlyPayment1 * numberOfPayments;

    const newMicroCredit = new MicroCredit({
      client,
      commerce,
      commerceName,
      amount,
      interestRate,
      term,
      status,
      monthlyPayment: monthlyPayment1.toFixed(2), // Redondeamos a dos decimales
      totalAmountDue: totalAmountDue1.toFixed(2), // Redondeamos a dos decimales
    });
    const microCreditSaved = await newMicroCredit.save();
    return NextResponse.json(microCreditSaved);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
