"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function P2PTransfer(phone: string, amount: number) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
    return {
      message: "unauthorized",
      success: false,
    };
  }
  try {
    const receiver = await prisma.user.findFirst({
      where: {
        number: phone,
      },
      select: {
        id: true,
        Balance: true,
        number: true,
      },
    });
    if (!receiver || !receiver.Balance[0]) {
      return {
        message: "Receiver not found",
        success: false,
      };
    }

    await prisma.$transaction(async (tx: any) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`;
      // this will lock the db for that request so that user can't initiate more transfer than it has

      const senderBalance = await tx.balance.findFirst({
        where: { userId: Number(session.user.id) },
      });
      if (!senderBalance) {
        throw new Error("Sender account not found");
      }

      if (senderBalance?.amount < amount) {
        throw new Error("insufficient balance");
      }

      await tx.balance.update({
        where: { userId: Number(session.user.id), id: senderBalance.id },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });
      await tx.balance.update({
        where: { userId: Number(receiver.id) },
        data: {
          amount: {
            increment: amount,
          },
        },
      });

      await tx.p2pTranaction.create({
        data: {
          amount,
          senderId: Number(session.user.id),
          receiverId: receiver.id,
        },
      });
    });

    return {
      message: "transfer successfull",
      success: true,
    };
  } catch (e: any) {
    return {
      message: e.message,
      success: false,
    };
  }
}
