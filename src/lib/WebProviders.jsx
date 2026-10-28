import { WagmiProvider } from 'wagmi'
import { mainnet, polygon } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const projectId = '1af94f6197a84bb9b0bbf205a8e25fb0'

const networks = [mainnet, polygon]
const wagmiAdapter = new WagmiAdapter({ networks, projectId })

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  features: {
    analytics: true
  }
})

const queryClient = new QueryClient()

export function WebProviders({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
