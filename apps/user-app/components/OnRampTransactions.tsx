import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between">
            <div className="my-4">
              <div className="text-sm">
                {t.provider} -{" "}
                <span
                  className={
                    t.status == "Success"
                      ? "text-green-500"
                      : t.status == "Failure"
                        ? "text-red-600"
                        : "text-blue-500"
                  }
                >
                  {t.status}
                </span>
              </div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">+ Rs {t.amount}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
