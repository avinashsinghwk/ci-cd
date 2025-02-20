import { Card } from "@repo/ui/card";

export function ReceiveTransactions({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    sender: {
      name: string;
      number: string;
    };
    id: number;
  }[];
}) {
  if (!transactions.length) {
    return (
      <div className="w-1/2">
        <Card title="Receive Transactions">
          <div className="text-center pb-8 pt-8">No Receive transactions</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-1/2">
      <Card title="Receive Transactions">
        <div className="pt-2">
          {transactions.map((t) => (
            <div key={t.id} className="flex justify-between">
              <div className="my-4">
                <div className="text-sm font-bold">
                  From -{" "}
                  <span className="text-blue-700">
                    {t.sender.name} ({t.sender.number})
                  </span>
                </div>
                <div className="text-slate-600 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center text-green-800 font-bold">
                + Rs {t.amount}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
