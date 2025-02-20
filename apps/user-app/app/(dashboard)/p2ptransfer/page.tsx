import { SendMoneyCard } from "../../../components/SendMoneyCard";

export default function P2ptransferPage() {
  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="w-full mt-32 flex justify-center items-center">
        <SendMoneyCard />
      </div>
    </div>
  );
}
