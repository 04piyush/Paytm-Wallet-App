import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";
async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}
export default async function () {
  const transactions = await getOnRampTransactions();
  return (
    <div className="h-full w-full">
      <OnRampTransactions transactions={transactions} />
    </div>
  );
}
