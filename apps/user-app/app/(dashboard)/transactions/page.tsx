import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { SendTransactions } from "../../../components/SendTransactions";
import { ReceiveTransactions } from "../../../components/ReceiveTransactions";

interface sendtrxType {
  amount: number;
  startTime: Date;
  id: number;
  receiver: {
    name: string | null;
    number: string;
  };
}

interface receivetrxType {
  amount: number;
  startTime: Date;
  id: number;
  sender: {
    name: string | null;
    number: string;
  };
}

async function sendTransactions(senderId: number) {
  try {
    const sendtrx: sendtrxType[] = await prisma.p2pTranaction.findMany({
      where: { senderId },
      select: {
        receiver: {
          select: {
            name: true,
            number: true,
          },
        },
        amount: true,
        startTime: true,
        id: true,
      },
    });
    return sendtrx.map((t) => ({
      amount: t.amount,
      time: t.startTime,
      receiver: {
        name: t.receiver.name ? t.receiver.name : "Anonymous",
        number: t.receiver.number,
      },
      id: t.id,
    }));
  } catch (e) {
    return [];
  }
}

async function receiveTransactions(receiverId: number) {
  try {
    const receivetrx: receivetrxType[] = await prisma.p2pTranaction.findMany({
      where: { receiverId },
      select: {
        id: true,
        startTime: true,
        amount: true,
        sender: {
          select: {
            name: true,
            number: true,
          },
        },
      },
    });
    return receivetrx.map((t) => ({
      amount: t.amount,
      time: t.startTime,
      sender: {
        name: t.sender.name ? t.sender.name : "Annonymour",
        number: t.sender.number,
      },
      id: t.id,
    }));
  } catch (e) {
    return [];
  }
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.id) {
    return <div>Your are currently not logged in</div>;
  }
  const sendTrx = await sendTransactions(Number(session.user.id));
  const receiveTrx = await receiveTransactions(Number(session.user.id));

  return (
    <div className="flex gap-5 w-full m-4">
      <SendTransactions transactions={sendTrx} />
      <ReceiveTransactions transactions={receiveTrx} />
    </div>
  );
}
