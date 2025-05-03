export default function DepositForm() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const { deposit } = useAccount();

  const handleDeposit = async () => {
    setError("");
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      setError("Enter a valid amount.");
      return;
    }
    const success = await deposit(value);
    if (!success) setError("Deposit failed. Try again.");
    setAmount("");
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2 text-gray-800">Deposit Funds</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2 text-black placeholder-gray-500"
      />
      <button
        onClick={handleDeposit}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
      >
        Deposit
      </button>
      {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
    </div>
  );
}
