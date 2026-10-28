import { FaChartBar, FaComment, FaSearch, FaCoins, FaCartPlus, FaMoneyBillWave, FaBolt, FaUserPlus, FaVoteYea, FaTrophy, FaSlidersH, FaPlusCircle, FaGlobe, FaUsers, FaRobot, FaHandshake, FaChartLine, FaTwitterSquare, FaBrain, FaTelegramPlane } from 'react-icons/fa';

export const indexFeatures = [
    {
        icon: <FaSearch className='text-7xl text-[var(--owner)] p-2'/>,
        label: 'Real-time Market Insights',
        text: 'Live Crypto market Data enhanced with AI Insights'
    },
    {
        icon: <FaChartBar className='text-7xl text-[var(--owner)] p-2'/>,
        label: 'Ai Prediction Tools',
        text: 'Forecast movement, sentiment and early market shifts'
    },
    {
        icon: <FaComment className='text-7xl text-[var(--owner)] p-2'/>,
        label: 'Narrative Trend Indicator',
        text: 'Dehta Tracks rising narrative across crypto communities'
    },
]

export const faq = [
    {
        label: 'What is Dehta Labs?',
        text: 'Dehta Labs is a next-generation crypto intelligence layer powered by real-time data, AI sentiment models, and on-chain signals for investors, creators, and builders.',
        key: 'one'
    },
    {
        label: 'Why did you rebrand from Faeces AI?',
        text: 'We evolved from narrative-based meme trading into a data-driven ecosystem. DEHTA = “data.” Data is now the core of profitable decisions.',
        key: 'two'
    },
    {
        label: 'What is TrendBet?',
        text: 'TrendBet is a prediction engine with wallet integration that lets users forecast market trends and earn rewards for accurate insights.',
        key: 'three'
    },
    {
        label: 'What do the NFT Glasses do?',
        text: 'They unlock deeper analytics, AI research tools, and premium insight layers inside the platform.',
        key: 'four'
    },
    {
        label: 'Is Dehtå free?',
        text: 'Basic access is free. Advanced insights may require wallet connection or lenses which require purchase from the market section.',
        key: 'five'
    },
    {
        label: 'Who can use Dehtå?',
        text: `
        Investors
        Creators
        Builders
        Anyone working with crypto data, trends, or tools`,
        key: 'six'
    },
    {
        label: 'How do I start?',
        text: 'Just click Get Started → explore the dashboard.',
        key: 'seven'
    },
]

export const LensInfo = [
    {
        icon: <FaCoins className='text-5xl text-[var(--owner)] p-2'/>,
        text: 'Earn Lens'
    },
    {
        icon: <FaMoneyBillWave className='text-5xl text-[var(--owner)] p-2'/>,
        text: 'Spend Lens'
    },
    {
        icon: <FaCartPlus className='text-5xl text-[var(--owner)] p-2'/>,
        text: 'Buy Lens'
    },
]

export const TrendBetData = [
    {
        type: "creator",
        data: [
            {
                text: "Launch Trend",
                icon: <FaBolt className='text-5xl text-[var(--owner)] p-2'/>
            },
            {
                text: "Set Conditions",
                icon: <FaSlidersH className='text-5xl text-[var(--owner)] p-2'/>
            },
            {
                text: "Get Rewards",
                icon: <FaCoins className='text-5xl text-[var(--owner)] p-2'/>
            },
        ]
    },
    {
        type: "participant",
        data: [
            {
                text: "Join Trend",
                icon: <FaUserPlus className='text-5xl text-[var(--owner)] p-2'/>
            },
            {
                text: "Cast Vote",
                icon: <FaVoteYea className='text-5xl text-[var(--owner)] p-2'/>
            },
            {
                text: "Win Payouts",
                icon: <FaTrophy className='text-5xl text-[var(--owner)] p-2'/>
            },
        ]
    },
]



export const ProjectsData = [
    {
        label: "List your project",
        text: "Start a new project in minutes with clean tools built for builders.",
        icon: '/assets/ui/add_p.svg'
    },
    {
        label: "List it publicly",
        text: "Show your project to the entire community and start getting eyes on it.",
        icon: '/assets/ui/public_p.svg'
    },
    {
        label: "Get community insights",
        text: "See what people think through reactions, comments and engagement signals.",
        icon: '/assets/ui/community_p.svg'
    },
    {
        label: "Receive AI analysis",
        text: "Get smart, data-backed evaluations to guide your next moves.",
        icon: '/assets/ui/ai_p.svg'
    },
    {
        label: "Attract collaborators",
        text: "Connect with people who want to build with you or support your vision.",
        icon: '/assets/ui/collab_p.svg'
    },
    {
        label: "Track performance",
        text: "Watch your growth with clear metrics and activity tracking.",
        icon: '/assets/ui/track_p.svg'
    },
    
]


export const SocialsData = [
    {
        label: "Our X Official",
        text: "Follow us on X so you don't miss any update",
        icon: <object data="/assets/ui/x.svg" type="image/svg+xml"/>,
        link: "https://x.com/dehta_ai"
    },
    {
        label: "Our IQWiki Official",
        text: "Follow us on X so you don't miss any update",
        icon: <object data="/assets/ui/iq_wiki.svg" type="image/svg+xml"/>,
        link: "https://iq.wiki/wiki/dehta-ai"
    },
    {
        label: "Our Telegram Official",
        text: "Join our TG Official so you don't miss any update",
        icon: <object data="/assets/ui/tg.svg" type="image/svg+xml"/>,
        link: "https://t.me/+kYQPMrSwtbwxMjl0"
    },
]



export const TeamData = [
    {
        name: "Glick Fortune",
        position: "Executive Director",
        image: "/assets/images/team/phi.jpg",
        link: "https://x.com/jon_thebull?s=21"
    },
    {
        name: "Jeremy Ford",
        position: "Head of Growth",
        image: "/assets/images/team/jeremy.jpeg",
        link: "https://x.com/jon_thebull?s=21"
    },
    {
        name: "Peter Donaldson",
        position: "COO",
        image: "/assets/images/team/peter.jpeg",
        link: "https://www.linkedin.com/in/pete-donaldson"
    },
    {
        name: "Ashish Kumar",
        position: "Advisor",
        image: "/assets/images/team/ashish.jpg",
        link: "https://www.linkedin.com/in/c2ashish"
    },
    {
        name: "Big Dennis",
        position: "Marketing Advisor",
        image: "/assets/images/team/dennis.jpg",
        link: "https://x.com/offdutydennis?s=21"
    },
]
