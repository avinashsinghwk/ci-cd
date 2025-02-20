"use client";

import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { P2PTransfer } from "../app/lib/actions/p2ptransfer";

export function SendMoneyCard() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);

  async function handleSendMoney() {
    const res = await P2PTransfer(phone, amount);
    alert(res.message);
  }

  return (
    <div className="w-1/2">
      <Card title="Send Money">
        <TextInput
          onChange={(value) => {
            setPhone(`${value}`);
          }}
          placeholder="phone no."
          label="Phone number"
        />
        <TextInput
          onChange={(value) => {
            setAmount(value);
          }}
          placeholder="amount in rs."
          label="Amount"
        />
        <div className="flex justify-center mt-4">
          <Button onClick={handleSendMoney}>Send Money</Button>
        </div>
      </Card>
    </div>
  );
}
