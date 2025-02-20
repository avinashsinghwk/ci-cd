"use server";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

interface TransferOptions {
  amount: number;
  provider: string;
}

export const createOnRampTransaction = async ({
  amount,
  provider,
}: TransferOptions) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      message: "unable to create transaction",
    };
  }
  try {
    await prisma.onRampTransaction.create({
      data: {
        status: "Processing",
        userId: Number(session.user.id),
        startTime: new Date(),
        amount,
        provider,
        token: Math.random().toString(36).substring(7),
      },
    });
    return {
      message: "transaction created",
    };
  } catch (e) {
    return {
      message: "unable to create transaction",
    };
  }
};
