import React, { useEffect, useState } from 'react';
import {
  emptyResult,
  Loading,
} from '@/components/Tools/Misc';
import Filters from '@/components/Tools/ProjectsFilter';
import Layout from '../components/Layout';
import ProjectCard from '../../components/ui/Advisor/ProjectCard';
import axios from 'axios';
import DashboardLayout from '../../layouts/Advisor/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { apiUrl, appName } from '../../App';
import { useUser } from '@/context/UserContext';
import { useMisc } from '@/context/MiscContext';
import Offcanvas from '@/components/ui/Offcanvas';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import { RateForm } from '@/components/Advisor/Forms/RateForm';

const line = 'Explore Verified and AI-Analyzed Projects across the crypto ecosystem';

function WritingLine() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((value) => (value > line.length ? 0 : value + 1));
    }, 2000 / (line.length + 6));
    return () => window.clearInterval(timer);
  }, []);

  return <p className="type-line lg:text-2xl text-md mt-3 mb-1">{line.slice(0, count)}<span className="type-caret" /></p>;
}

export default function Projects() {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showRateForm, setShowRateForm] = useState(false);
  const { user, role, sidebarData } = useUser();
  const {getProjects, isLoading, projects} = useMisc();

  useEffect(() => {
    getProjects();
  },[])

  const Content = (
    <div className={`min-h-screen flex flex-col items-center text-primary px-6 md:px-10 lg:px-16 py-14 ${user ? '' : 'projectsbg py-30'} w-full`}>

      {/* Header */}
      <div className="buildfi-zone w-full max-w-7xl flex flex-col items-center mb-10 text-center">
        <h1 className="relative text-5xl font-semibold text-[#39ff6a] animate-pulse delay-200">BuildFi</h1>
        <WritingLine />
        {user?.role === 'founder' && (
          <Link to="/edit-project" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#3dffc5] px-5 py-2 text-[#3dffc5] shadow-[0_0_18px_rgba(61,255,197,0.35)]">
            <FaPlusCircle /> List your project
          </Link>
        )}

        <Filters
          showFilters={showFilters}
          data={projects}
          filteredData={(e: any) => setFilteredProjects(e)}
        />
      </div>

      {/* Content Grid */}
      {isLoading ? (
        <div className="flex flex-col justify-center items-center min-h-[50vh]">
          <Loading />
        </div>
      ) : (filteredProjects.length > 0 || projects.length > 0) ? (
        <div className="project-swipe">
          {(filteredProjects.length > 0 ? filteredProjects : projects).map((project: any) => (
            <ProjectCard
              key={project.id}
              {...project}
              authUserId={user?.id}
              userId={project?.user_id}
              more={project.id}
            />
          ))}
        </div>
      ) : (
        emptyResult('No Project Found')
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Listed Projects - {appName}</title>
      </Helmet>

      {/* If logged in, show Dashboard layout; otherwise the public layout */}
      {user ? (
        <DashboardLayout
          user={user}
          sidebarData={sidebarData}
          sidebarDataType={`${role}`}
          classy="projectsbg"
        >
          {Content}
        </DashboardLayout>
      ) : (
        <Layout>
          {Content}
        </Layout>
      )}

      <Offcanvas
        isOpen={showRateForm}
        onClose={() => setShowRateForm(false)}
        title="Rate Project"
      >
        <RateForm auth={user} />
      </Offcanvas>
    </>
  );
}
