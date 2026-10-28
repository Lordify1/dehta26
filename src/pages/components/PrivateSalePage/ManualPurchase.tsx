const ManualPurchase = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-2">Send ETH Manually</h2>
      <p className="mb-4 text-gray-300">Send ETH to the wallet address below:</p>
      <div className="bg-gray-800 p-4 rounded text-sm break-all font-mono">
        0x1234567890abcdef1234567890abcdef12345678
      </div>
      <p className="mt-2 text-xs text-gray-500">Make sure to only send from a wallet you control.</p>
    </div>
  )
}

export default ManualPurchase
