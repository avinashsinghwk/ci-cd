import { Card } from "@repo/ui/card";

export function SendTransactions({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    receiver: {
      name: string;
      number: string;
    };
    id: number;
  }[];
}) {
  if (!transactions.length) {
    return (
      <div className="w-1/2">
        <Card title="Send Transactions">
          <div className="text-center pb-8 pt-8">No Send transactions</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-1/2">
      <Card title="Send Transactions">
        <div className="pt-2">
          {transactions.map((t) => (
            <div key={t.id} className="flex justify-between">
              <div className="my-4">
                <div className="text-sm font-bold">
                  To -{" "}
                  <span className="text-blue-700">
                    {t.receiver.name} ({t.receiver.number}){" "}
                  </span>
                </div>
                <div className="text-slate-600 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center text-red-800 font-bold">
                - Rs {t.amount}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
