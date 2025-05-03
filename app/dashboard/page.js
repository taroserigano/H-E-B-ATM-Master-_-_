import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Balance from "@/components/Balance";
import DepositForm from "@/components/DepositForm";
import WithdrawForm from "@/components/WithdrawForm";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;

  if (!accountId) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        H-E-B ATM Dashboard
      </h1>
      <Balance />
      <DepositForm />
      <WithdrawForm />
      <LogoutButton />
    </div>
  );
}
