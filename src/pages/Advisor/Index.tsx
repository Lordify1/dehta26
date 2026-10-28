import react from 'react'
import LandingLayout from '@/layouts/Advisor/LandingLayout'
import Hero from '@/components/Advisor/Sections/Hero'
import How from '@/components/Advisor/Sections/How'
import { Head } from '@inertiajs/react'
import Features from '@/components/Advisor/Sections/Features'
import PersonaSwitcher from '@/components/Advisor/Sections/PersonaSwitcher'
import AISneakPeek from '@/components/Advisor/Sections/AiSneakPeek'
import Testimonials from '@/components/Advisor/Sections/Testimonials'
import FAQ from '@/components/Advisor/Sections/FAQ'

const AdvisorIndex = ({user}) => {
    return(
        <LandingLayout user={user}>
            <Head
            title='Your AI-Powered Advisor'
            />
            <Hero/>
            <How/>
            <Features/>
            <PersonaSwitcher/>
            <AISneakPeek/>
            <Testimonials/>
            <FAQ/>
        </LandingLayout>
    )
}

export default AdvisorIndex