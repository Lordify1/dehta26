import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Header } from "../../components/Main/Header";
import { Footer } from "../../components/Main/Footer";
import { IoCloseCircleOutline } from "react-icons/io5";
import { classMap } from "@/components/Tools/Misc";
import { Head } from "@inertiajs/react";
import { appUrl } from "@/dapp";

// Data
const decksData = [
  {
    id: 1,
    name: "SOIN Global",
    tagline:
      "The future of Web3 marketing and growth is automated, intelligent, and on-chain - Powered by AI",
    summary:
      "SOIN Global is on a mission to dismantle outdated, overpriced Web2 marketing agencies by unleashing a new breed of AI Agents engineered for Web3 scale, speed, and transparency. Forget Excel sheets and botted KOLs — SOIN replaces chaos with code, middlemen with smart contracts, and marketing guesswork with ROI-driven precision.",
    image: `${appUrl}/assets/images/innovations/soin.png`,
    deck: {
      problem: {
        title: "The Web3 Marketing Crisis",
        points: [
          "$100K campaigns = 3 bots and 14 likes",
          "Top KOLs” with fake followers and zero conversion",
          "No tracking. No attribution. No accountability.",
          "Endless middlemen draining value from both brands and creators",
        ],
      },
      solution: {
        title: "Enter SOIN: AI That Outperforms Agencies",
        description:
          "SOIN is not a tool — it’s a full-stack AI-powered marketing engine trained on how Web3 actually works.",
        agents: [
          {
            name: "Market Intelligence Agent",
            description:
              "Scans shill groups, detects fake traction, and tracks token sentiment in real time.",
          },
          {
            name: "KOL Matching Engine",
            description:
              "Pairs campaigns with authentic creators using verified reach, performance history, and wallet analytics.",
          },
          {
            name: "Budget Optimization Bot",
            description:
              "Autonomously reallocates spend for max ROI using live campaign data.",
          },
          {
            name: "Smart Contract Payouts",
            description:
              "Automated trustless payments — no more “will send after promo” promises.",
          },
        ],
      },
      traction: {
        title: "Current Traction",
        points: [
          "MVP live with functional AI & smart contract layers",
          "Integrated wallet, Telegram, and on-chain signal tracking",
          "Already onboarding Web3 creators, influencers, and early partners",
          "Positioned for rapid growth in the $15B Web3 marketing space",
        ],
      },
      businessModel: {
        title: "Business Model & Monetization",
        points: [
          "Subscription-based access to AI tools for brands and KOLs",
          "Platform fees on campaign volumes",
          "Tiered utility for $SOIN token (discounts, staking, governance)",
        ],
      },
      fundraising: {
        title: "Why Invest Now",
        points: [
          "Pre-revenue, pre-valuation, and pre-hype",
          "Defensible moat with proprietary AI infrastructure",
          "Web3-native growth model that scales with the ecosystem",
          "Backed by ex-Google/Meta engineers, Stanford alumni, and Silicon Valley syndicates",
        ],
      },
      links: {
        title: "Links & Next Steps",
        items: [
          { text: "Website", url: "https://www.soinglobal.com/" },
          { text: "X (Twitter)", url: "https://x.com/soin_global?s=21" },
          {
            text: "Pitch Deck",
            url: "https://docsend.com/view/hm3e96ke6zx7p4km",
          },
          {
            text: "Token Metrics",
            url: "https://docs.google.com/spreadsheets/d/1VuHE2RggOPCl9VZjEO1ZNVYwi5y8zxB31esQYqJclVQ/edit?gid=242255297#gid=242255297",
          },
          { text: "Next Steps", url: "https://www.soinglobal.com/next-steps" },
        ],
      },
    },
  },
  {
    id: 2,
    name: "A.A.A C(H+A)RM",
    tagline:
      "Silicon Valley’s Autonomous Al Agents Platform & Orchestration CRM / layer3 'C(H+A)RM'",
    summary:
      "An ecosystem where - Autonomous AI agents (human`s AVATARs / CLONEs / TWINs) help founders, investors, and developers SCALE themselves",
    image: `${appUrl}/assets/images/innovations/aaa.png`,
    deck: {
      community: {
        title: "Our awesome community",
        x: "195k",
        telegram: "263k",
        youtube: "9k",
        privateCommunities:
          "30+ private сommunities with 50k+ VC / Founders / AI Builders (where A.A.Agents collect information and make intros to VC, Exchanges, Market makers etc)",
      },
      product: {
        title:
          '"C(H+A)RM" is a CRM / Layer3 for AI Agents + Humans Orchestration',
        description:
          'Technology enabling Humans + AI Agents to work in teams & solve tasks autonomously => "C(H+A)RM"',
        cloningPlatform: {
          subtitle: "Cloning platform: YOU >into> Autonomous AI Agent",
          points: [
            "Creating your avatar/ digital twin - an AI agent working 24/7. No code",
            "They speak like you, act like you. or even better",
            "To automate OUTREACH, scouting, sales, boring routine",
          ],
        },
      },
      incubator: {
        title:
          "INCUBATOR for AI Agents Builders in Web3 (by community of Palo Alto Ai Research Lab)",
        details:
          "Warm intros to AI Builders & Investors from Silicon Valley, Stanford Alumni, Engineers - Google, Meta, Tesla etc. We help startups secure funding and resources",
      },
      for: {
        title: "For",
        points: [
          "investors - AI SCOUTING, Automating deal flow and analytics.",
          "founders - AI OUTREACH for growth and fundraising",
          "aiDevelopers - build, monetize, tokenize AI agents",
        ],
      },
      traction: {
        title: "Traction",
        points: [
          "100+ projects listed on Exchanges w/our connections",
          "2,345 direct VCs connection",
          "3,746 we made warm intros",
          "108,515 ai / crypto leads in our C(H+A)RM",
          "1-2 M average round with advisory by Palo Alto lab",
          "703 projects raised with Palo Alto lab Member Advisory",
        ],
      },
      fundraising: {
        title: "FUNDRAISING DETAILS \\ TICKER: $AAA",
        details: [
          "NODE Sale - Upcoming\\Waitlist",
          "Public Sale - OPEN 40% TGE, 0m cliff, 5m vesting",
          "Seed Round — 4mill$ OVERSUBSCRIBED",
        ],
      },
      backersAndPartners: {
        title: "Backers & Partners:",
        list: [
          "DCVC",
          "AI Fund",
          "Menlo Ventures",
          "Animoca Brands",
          "CoLabs",
          "Galaxy Ventures",
          "NPC Labs",
          "Yellow Whale Labs",
          "Crypto Times",
          "Green Street Capital",
          "APAC DAO",
          "Palo Alto Research Lab",
          "WTG Ventures",
          "EnigmaFund VC",
          "Bella Ventures",
          "N8 Capital",
          "Transcend Labs",
          "Coin Terminal",
          "Cask Capital",
          "Loona Ventures",
        ],
      },
      cex: {
        title: "CEXs we'll be on:",
        list: ["Huobi", "Kucoin", "MEXC", "OKX", "ByBit"],
      },
      launchpads: {
        title: "Launchpads (in the bargaining negotiation):",
        list: [
          "Coinlist",
          "Binance Wallet",
          "ByBit launchpad",
          "And many others: ChainGPT",
          "Finceptor",
          "RedKite",
          "CoinTerminal",
          "Spores Network",
          "Singularity DAO",
        ],
      },
      dates: {
        title: "Dates:",
        tge: "Q3~Q4 2025",
      },
      links: {
        title: "Follow Us Now",
        items: [
          { text: "Website", url: "https://palo-alto.ai/en/" },
          { text: "Token Node Sale", url: "https://aaapad.palo-alto.ai/" },
          { text: "Gitbook", url: "https://secret-pad.gitbook.io/aaa-gitbook" },
          { text: "Pitch Deck", url: "https://docsend.com/v/b9gww/aaacrm" },
          {
            text: "Tokenomics",
            url: "https://docs.google.com/spreadsheets/d/1CSrTUETRU58OBbyT259Oagcyg5ZwvKCsZ4g7wNiNdZA/edit?gid=1816172639#gid=1816172639",
          },
          { text: "X (Twitter)", url: "https://x.com/AAAPadSF" },
          { text: "YouTube", url: "https://www.youtube.com/@AAACRM/" },
          { text: "Calendly", url: "https://calendly.com/paloaltolab/lab" },
          { text: "News (Telegram)", url: "https://t.me/AAAPadSF" },
          { text: "VCs DAO", url: "https://t.me/+VN13es3NCHg0ZjA9" },
          { text: "Founders DAO", url: "https://t.me/SV_founders" },
          {
            text: "Try Our Agents (10% discount)",
            url: "https://docsend.com/v/b9gww/pricing",
          },
        ],
      },
    },
  },
  {
    id: 3,
    name: "Puppets AI",
    tagline:
      "Your everyday AI buddy for web3 tasks, daily work, and fun games — all powered by a smart multi-agent system.",
    summary:
      "Puppets AI solves the messy agent UX by acting as a single gateway and simple interface for managing many agents in one place — no more juggling separate bots for each task.",
    image: `${appUrl}/assets/images/innovations/puppet.png`,
    deck: {
      problem: {
        title: "Problem",
        description:
          "Puppets AI solves the messy agent UX by acting as a single gateway and simple interface for managing many agents in one place — no more juggling separate bots for each task.",
      },
      solution: {
        title: "Solution",
        description:
          "With its drag-and-drop agent builder, anyone can create new skills for their AI friend.",
      },
      partnersAndBackers: {
        title: "Backers and Partners",
        privateRound:
          "Private Round: $100,000 round with $50,000 already allocated to Eese, Igor K. (Rivalz AI), Joe Chen (Movement Labs), A. Roushan (GP at DPH Ventures), and other seasoned veterans. $50,000 allocation is still open !.",
        publicRound: "Public Round(250k total): 50k- gains",
        decubate: "Decubate - 100k",
        eese: "Eese -100k",
        partnerships: ["Arbitrum", "Privy", "Nvidia", "Rivalz AI"],
      },
      links: {
        title: "Links",
        items: [
          { text: "Website", url: "https://www.puppetsai.net" },
          {
            text: "Tokenomics",
            url: "https://docs.google.com/spreadsheets/d/1bEUA_0N_e8HoADAS_Aeemk131FYNHTjjzuc6E_X-KcQ/edit?usp=sharing",
          },
          {
            text: "Whitepaper",
            url: "https://puppetsai.gitbook.io/puppetsai/",
          },
          { text: "Private Community", url: "https://t.me/+sZF2I7zAz601YTFl" },
          { text: "X (Twitter)", url: "https://x.com/ThePuppetsAI" },
        ],
      },
    },
  },
  {
    id: 4,
    name: "Eternex Network",
    tagline:
      "The Infrastructure Layer for Real-World Finance in Emerging Markets",
    summary:
      "Eternex Network is building the rails for decentralized finance that actually works in the real world. Launched with a mission to unlock access to efficient, Eternex Network -",
    image: `${appUrl}/assets/images/innovations/eternex.jpg`,
    deck: {
      investorOverview:
        "Eternex Network – The Infrastructure Layer for Real-World Finance in Emerging Markets",
      intro:
        "Eternex Network is building the rails for decentralized finance that actually works in the real world. Launched with a mission to unlock access to efficient, Eternex Network -",
      traction: {
        title: "Traction Highlights:",
        points: [
          "30,000+ community members across Africa, Asia, and the Middle East.",
          "2,000+ users already signed up on the platform.",
          "$50M+ in real-world assets (RWAs) already mapped ranging from Sharia-compliant money market funds to commercial property portfolios.",
          "First Sharia-compliant tokenized money market fund in Kenya launched on-chain.",
          "$290M+ RWA deal pipeline in progress spanning East Africa’s top-rated fund managers, Dubai’s gold exchange, and private REITs in Kenya.",
          "4 institutional partnerships secured with licensed fund managers.",
          "Accepted into Kenya’s Capital Markets Authority (CMA)",
          "Phase 1 IEO completed across 3 exchanges (P2PB2B, Dex-Trade, BitStorage) and deployed across Tron, Solana, and Stellar.",
        ],
      },
      pillars: {
        title: "Product Pillars:",
        points: [
          "Instant, ultra-low-cost payments: QR-enabled, near-zero fee transactions for everyday use.",
          "AI-Powered DeFi Engine: Smart yield allocation, risk scoring, and investment automation.",
          "Tokenized RWAs: Democratizing access to income-generating real estate and regulated financial products from $10.",
          "Staking & Governance: Early APYs up to 30% and 1-token, 1-vote model for ecosystem decision-making.",
        ],
      },
      why: {
        title: "WHY ETERNEX, WHY NOW?",
        description:
          "Africa’s $500B informal economy remains underserved by traditional finance yet increasingly connected via mobile, crypto, and digital wallets. Eternex is positioned to lead this leap forward,not with speculative hype, but with on-chain tools that work in everyday life.",
      },
      links: {
        title: "Social Links",
        items: [
          { text: "Telegram", url: "https://t.me/etrnx01" },
          { text: "X (Twitter)", url: "https://x.com/etrnxoffical?s=21" },
          { text: "Website", url: "https://etronnetwork.org/" },
        ],
      },
    },
  },
];

const Innovations = () => {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleViewDeck = (deck) => {
    setSelectedDeck(deck);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setSelectedDeck(null);
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-[#0e0e0e] text-white"
      scroll-region={true}
    >
      <Header />
      <Head title="Innovations" />
      <main className="flex-grow py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <Fade triggerOnce cascade>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#3dffc5]">
              Innovations
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-16">
              {/* Discover the groundbreaking projects incubated by PhiFinance. Each
              of these businesses represents a bold step forward in the Web3
              ecosystem. */}
              ~~~~~~~~
            </p>
          </Fade>

          {/* Business Cards */}
          {!showDetails && !selectedDeck && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
              {decksData.map((deck, i) => (
                <Fade direction="up" delay={i * 100} triggerOnce key={deck.id}>
                  <div
                    className={`bg-[#111315] border border-[#1e1f22] rounded-xl flex flex-col h-full shadow-md hover:shadow-lg transition ${classMap.hoverAnimate()}`}
                  >
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-semibold text-[#00ffb3] mb-2">
                        {deck.name}
                      </h3>
                      <img
                        src={deck.image}
                        alt={deck.name}
                        className={`mb-2 rounded-t-xl w-full h-48 object-cover`}
                      />
                      <p className="text-gray-300 mb-4 text-sm">
                        {deck.tagline}
                      </p>
                      <p className="text-gray-400 flex-1 text-sm">
                        {deck.summary}
                      </p>
                      <button
                        onClick={() => handleViewDeck(deck)}
                        className="mt-6 px-4 py-2 text-sm font-semibold rounded-lg bg-[#3dffc5] text-black hover:bg-[#3dffc5]/80 transition"
                      >
                        View Pitch Deck
                      </button>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          )}
        </div>

        {/* Modal for Pitch Deck */}
        {showDetails && selectedDeck && (
          <Fade duration={400}>
            <div className="bg-[#0e0e0e]/95 backdrop-blur-sm pt-20 pb-12">
              <div className="max-w-4xl mx-auto p-8 md:p-12 bg-[#121417] border border-[#1e1f22] rounded-2xl shadow-2xl relative">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                  <IoCloseCircleOutline className="text-3xl" />
                </button>

                {/* Deck Content */}
                <h2 className="text-3xl md:text-4xl font-bold text-[#3dffc5] mb-4 text-center">
                  {selectedDeck.name}
                </h2>
                <p className="text-gray-400 mb-8 text-center">
                  {selectedDeck.tagline}
                </p>

                {/* Render Deck Sections */}
                {Object.entries(selectedDeck.deck).map(
                  ([key, section], index) => {
                    if (typeof section === "string") {
                      return (
                        <div key={index} className="mb-6">
                          <h3 className="text-2xl font-semibold text-[#00ffb3] mb-2 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </h3>
                          <p className="text-gray-300">{section}</p>
                        </div>
                      );
                    }

                    if (typeof section === "object" && section !== null) {
                      return (
                        <div key={index} className="mb-8">
                          <h3 className="text-2xl font-semibold text-[#00ffb3] mb-4">
                            {section.title || key.replace(/([A-Z])/g, " $1")}
                          </h3>

                          {/* General description */}
                          {section.description && (
                            <p className="text-gray-300 mb-4">
                              {section.description}
                            </p>
                          )}

                          {/* Specific text fields */}
                          {section.details && (
                            <p className="text-gray-300 mb-4">
                              {section.details}
                            </p>
                          )}
                          {section.privateRound && (
                            <p className="text-gray-300 mb-2">
                              {section.privateRound}
                            </p>
                          )}
                          {section.publicRound && (
                            <p className="text-gray-300 mb-2">
                              {section.publicRound}
                            </p>
                          )}
                          {section.decubate && (
                            <p className="text-gray-300 mb-2">
                              {section.decubate}
                            </p>
                          )}
                          {section.eese && (
                            <p className="text-gray-300 mb-2">{section.eese}</p>
                          )}
                          {section.subtitle && (
                            <h4 className="text-lg font-medium text-[#3dffc5] mb-2">
                              {section.subtitle}
                            </h4>
                          )}

                          {/* Array of points or details */}
                          {section.points && (
                            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                              {section.points.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          )}

                          {section.incubatedBy && (
                            <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                              {section.incubatedBy.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          )}

                          {/* Array of agents */}
                          {section.agents && (
                            <div className="space-y-4 mb-4">
                              {section.agents.map((agent, i) => (
                                <div key={i}>
                                  <h4 className="font-medium text-[#00ffb3]">
                                    {agent.name}
                                  </h4>
                                  <p className="text-gray-300">
                                    {agent.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* List of backers/partners (chips) */}
                          {section.list && (
                            <ul className="flex flex-wrap gap-2 mb-4">
                              {section.list.map((item, i) => (
                                <li
                                  key={i}
                                  className={`bg-[#1e1f22] text-gray-300 px-3 py-1 rounded-full text-sm ${classMap.hoverBg()}`}
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* List of other partners (chips) */}
                          {section.partnerships && (
                            <ul className="flex flex-wrap gap-2 mb-4">
                              {section.partnerships.map((partner, i) => (
                                <li
                                  key={i}
                                  className="bg-[#1e1f22] text-gray-300 px-3 py-1 rounded-full text-sm"
                                >
                                  {partner}
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Key-value pairs for community stats */}
                          {section.x && (
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                              {Object.entries(section).map(
                                ([metricKey, metricValue]) => (
                                  <div key={metricKey}>
                                    <h4 className="font-medium text-[#00ffb3] capitalize">
                                      {metricKey}:
                                    </h4>
                                    <p className="text-gray-300">
                                      {metricValue}
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>
                          )}

                          {/* Links section with "items" array */}
                          {section.items && (
                            <div className="space-y-3">
                              {section.items.map((link, i) => (
                                <span key={i}>
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#00ffb3] hover:underline font-medium"
                                  >
                                    {link.text}
                                  </a>{" "}
                                  {i < section.items.length - 1 && "~"}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return null;
                  },
                )}
              </div>
            </div>
          </Fade>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Innovations;
