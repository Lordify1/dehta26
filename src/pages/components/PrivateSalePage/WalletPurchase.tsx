import { useAccount, useSendTransaction } from 'wagmi';
import { useState } from 'react';
import { toast } from 'react-toastify';


const WalletConnect = ({ hero = false, presale = false }) => {
    const { isConnected, address } = useAccount();
    const [amount, setAmount] = useState<number>(0);
    const { sendTransactionAsync, isSuccess } = useSendTransaction();
    const [loading, setIsLoading] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');
    
    const chainid = ''

    const recipientAddress = '0xDefe84Db01b8b1A2c1e065325fFAc692581B2Db6';

    const fetchEthPrice = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const data = await response.json();
            return data.ethereum.usd;
        } catch (error) {
            console.error('Error fetching ETH price:', error);
            return null;
        }
    };
    

   
    const handlePurchase = async () => {
        if (!isConnected) {
            toast.error('Please connect your wallet first!');
            return;
        }

        if (chainid !== 8453) {
            toast.error('Please switch your network to Base.');
            return;
        }

        if (!amount || amount <= 0) {
            toast.error('Please enter a valid amount!');
            return;
        }

        try {
            const ethPrice = await fetchEthPrice();
            if (!ethPrice) {
                toast.error('Unable to fetch ETH price.');
                setIsLoading(false);
                return;
            }
    
            const dollarAmount = amount * 0.007; // Amount in dollars
            const ethAmount = (dollarAmount / ethPrice).toFixed(6); // Convert dollars to ETH
    
            const transaction = await sendTransactionAsync({
                to: recipientAddress,
                value: ethAmount,
                // gasLimit: 21000,
            });

            // const transactionData = {
            //     wallet_address: address,
            //     token_amount: amount,
            //     eth_amount: valueInEther,
            //     recipient_address: recipientAddress,
            //     transaction_hash: transaction,
            //     transaction_timestamp: new Date().toISOString(),
            // };
    
            setTransactionHash(transaction);
            toast.success('Transaction Success.');
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to initiate transaction.');
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="col-12 d-flex align-items-center justify-content-center">
                {isConnected && presale && (
                    <aside className="col-lg-6 col-12 roadmap-section" id="buyToken">
                        <span className="d-block mb-2">1 $FAECES = $0.007</span>
                        <input
                            type="number"
                            placeholder="Enter amount to purchase"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            style={{ marginRight: '10px', padding: '5px' }}
                        />
                        <input
                            type="text"
                            value={amount && amount > 0 ? '$ ' + (amount * 0.0005).toFixed(6) : ''}
                            readOnly
                            style={{ marginRight: '10px', padding: '5px' }}
                            placeholder="Calculated value"
                        />
                        <br />
                        <button
                            className="btn fbtn"
                            disabled={loading || !amount || amount <= 0}
                            onClick={handlePurchase}
                        >
                            {loading ? 'Processing...' : `Buy $FAECES`}
                        </button>
                        {isSuccess && (
                            <>
                                <p>Transaction confirmed! 🎉</p>
                                <iframe
                                    src="https://docs.google.com/forms/d/e/1FAIpQLSf0qhWgzbkD5CwtRM-6IROml8AnPKv7r-VUUtvxy35A-uhRNg/viewform?usp=header"
                                    width="100%"
                                    height="500"
                                    title="Google Form"
                                >
                                    Loading…
                                </iframe>
                                {transactionHash && (
                                    <div style={{ marginTop: '10px' }}>
                                        <p>
                                            <a target='_blank' href="https://docs.google.com/forms/d/e/1FAIpQLSf0qhWgzbkD5CwtRM-6IROml8AnPKv7r-VUUtvxy35A-uhRNg/viewform?usp=header">🔗 Google Form Link. Just in Case 🔗</a> <br />
                                            Transaction Hash: <code>{transactionHash}</code>
                                        </p>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(transactionHash)
                                                    .then(() => {
                                                        toast.success('Transaction hash copied to clipboard!');
                                                    })
                                                    .catch((err) => {
                                                        console.error('Failed to copy transaction hash:', err);
                                                        toast.error('Failed to copy transaction hash. Please try again.');
                                                    });
                                            }}
                                            className="btn btn-sm btn-secondary"
                                        >
                                            Copy Transaction Hash
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </aside>
                )}
                {hero && (
                    <>
                        <a href="#privateSale" className="btn fbtn btn-sm">
                            🧻 Buy $FAECES
                        </a>
                    </>
                )}
                {presale && !isConnected && (
                    <></>
                )}
            </section>

            {!isConnected && (
                <span
                    className={`text-warning ${hero && 'fs-6'} ${presale && 'fs-2'}`}
                >
                    ! Connect Wallet to Purchase $FAECES
                </span>
            )}

            {presale && (
                <footer className="text-center mt-4">
                    <p>
                                        For allocations of $1,000 and above, a SAFT agreement will be sent to your email after deposit confirmation.
                                    </p>
                    <hr />
                    <p>
                        Participation in this private sale is limited to non-US persons. This is a token utility sale for access to the ecosystem, not an investment contract.
                    </p>
                </footer>
            )}
        </>
    );
};


export default WalletConnect;
