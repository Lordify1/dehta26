import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import DashboardLayout from '../../layouts/Advisor/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { appName } from '../../App';
import { useUser } from '@/context/UserContext';
import { useMisc } from '@/context/MiscContext';
import Offcanvas from '@/components/ui/Offcanvas';
import { classMap, EmailVerifyGuard, Loading } from '../../components/Tools/Misc';
import EarnFiCard from '../../components/ui/Advisor/EarnFiCard';
import { IoShieldCheckmark } from 'react-icons/io5';
import { useOffCanvas } from '../../context/OffCanvasContext';
import EarnFiCreateForm from '../../components/Advisor/Forms/EarnFiCreateForm';
import { Link, useLocation } from 'react-router-dom';
import EarnFiOfferDetail from '../../components/ui/Advisor/EarnFiOfferDetail';
import { toast } from 'react-toastify';
import { offerOrigin } from '@/lib/offerOrigin';

export default function EarnFi() {
  const { user, role, sidebarData } = useUser();
  const { setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle } = useOffCanvas();
  const { getEarnFiOffers, earnfiJobs, earnfiTasks, earnfiStats, earnFiOffer, setEarnFiOffer, isLoading } = useMisc();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchSlug = params.get('slug') || "";
  const searchType = params.get('type') || "";

  const [activeSection, setActiveSection] = useState<'tasks' | 'jobs'>('tasks');
  const [offerType, setOfferType] = useState('job');

  useEffect(() => {
    getEarnFiOffers();
  }, []);

  useEffect(() => {
    if (!searchSlug || !searchType) return;
    const pool = searchType === 'job' ? earnfiJobs : earnfiTasks;
    if (!pool?.length) return;
    const found = pool.find((item) => String(item.slug || "").toLowerCase() === searchSlug.toLowerCase());
    if (!found) {
      toast.error(searchType === 'job' ? 'Job not Found' : 'Task not Found');
      return;
    }
    setEarnFiOffer(found);
    setOffId('submit_job_or_task');
    SetOfftitle(found.title);
    setShowOffCanvas(true);
  }, [searchSlug, searchType, earnfiJobs, earnfiTasks]);

  const pool = activeSection === 'tasks' ? earnfiTasks : earnfiJobs;
  const grouped = useMemo(() => {
    const list = Array.isArray(pool) ? pool : [];
    return {
      direct: list.filter((item) => offerOrigin(item) === 'direct'),
      indirect: list.filter((item) => offerOrigin(item) === 'indirect'),
    };
  }, [pool]);

  const Desk = ({ tone, items, type }: { tone: 'direct' | 'indirect'; items: any[]; type: 'job' | 'tasks' }) => {
    const direct = tone === 'direct';
    return (
      <section className={`desk-aura relative overflow-hidden rounded-2xl border p-2 ${direct ? 'border-emerald-400/30 bg-[#06110c]' : 'border-amber-300/30 bg-[#140f08]'}`}>
        <div className="mb-2 flex items-start justify-between gap-2">
          <div>
            <p className={`text-[10px] font-bold tracking-[0.22em] ${direct ? 'text-[#3dffc5]' : 'text-amber-200'}`}>
              {direct ? 'DIRECT LINKS' : 'INDIRECT LINKS'}
            </p>
            <h3 className="text-sm font-semibold text-white">{direct ? 'Partner desk' : 'Outside leads'}</h3>
            <p className="mt-0.5 text-[11px] leading-tight text-white/60">
              {direct
                ? 'Partners who contacted Dehta. Legit.'
                : 'Outside leads. Tread carefully.'}
            </p>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">{items.length}</span>
        </div>
        {isLoading ? (
          <Loading />
        ) : items.length === 0 ? (
          <p className="py-3 text-center text-xs text-white/40">No {direct ? 'direct' : 'indirect'} {type === 'job' ? 'jobs' : 'tasks'} on this shift.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-white">
              <thead>
                <tr className="border-b border-white/15 text-[11px] tracking-[0.16em] text-[#3dffc5]">
                  <th className="py-2 pr-3 font-medium">OFFER</th>
                  <th className="py-2 pr-3 font-medium">PAY</th>
                  <th className="py-2 pr-3 font-medium">WHERE</th>
                  <th className="py-2 font-medium">OPEN</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <EarnFiCard key={item.id || item.slug || idx} type={type} row {...(type === 'job' ? { Job: item } : { Task: item })} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    );
  };

  const Content = (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030705] px-4 py-16 text-white md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(61,255,197,0.14),transparent_40%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center">
        <div className="news-ruler" aria-label="EarnFi tape">
          <div className="news-track">
            {[0, 1].map((copy) => (
              <div key={copy}>
                <p className="news-line"><span>💼</span><b>{earnfiStats.total_offers_posted || '0'}</b> offers on the desk</p>
                <p className="news-line"><span>🛡️</span><b>${earnfiStats.secured_funds || '0'}</b> funds secured</p>
                <p className="news-line"><span>👥</span><b>{earnfiStats.total_contributors || '0'}</b> people earning</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs tracking-[0.45em] text-[#3dffc5]">EARNFI WORKSTATION</p>
        <h1 className="mt-3 text-center text-5xl font-semibold md:text-7xl">Clock in. Earn without a ceiling.</h1>
        <p className="mt-4 max-w-2xl text-center text-white/70">
          Two lanes on every job and every task. Direct work is partner-verified. Indirect work is marked so you can still earn, carefully.
        </p>

        <section className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {user ? (
            user?.email_verified_at ? (
              <>
                <button className={classMap.button()} onClick={() => { setOffId('create_job_or_task'); SetOfftitle('Create Job'); setShowOffCanvas(true); setOfferType('job'); }}>Post a Job</button>
                <button className={classMap.button()} onClick={() => { setOffId('create_job_or_task'); SetOfftitle('Create Task'); setShowOffCanvas(true); setOfferType('task'); }}>Post a Task</button>
              </>
            ) : (
              <EmailVerifyGuard height="w-full" message="Verify your Email to Create Offer" />
            )
          ) : (
            <Link to="/login" className={classMap.button()}>
              <IoShieldCheckmark className="mr-1 inline text-black" /> Login to work
            </Link>
          )}
        </section>

        <div className="mt-10 mb-8 flex rounded-full border border-white/10 bg-black/40 p-1">
          <button className={`rounded-full px-5 py-2 ${activeSection === 'tasks' ? 'bg-emerald-400 text-black' : 'text-white/70'}`} onClick={() => setActiveSection('tasks')}>Tasks</button>
          <button className={`rounded-full px-5 py-2 ${activeSection === 'jobs' ? 'bg-emerald-400 text-black' : 'text-white/70'}`} onClick={() => setActiveSection('jobs')}>Jobs</button>
        </div>

        <div className="mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <Desk tone="direct" items={grouped.direct} type={activeSection === 'jobs' ? 'job' : 'tasks'} />
          <Desk tone="indirect" items={grouped.indirect} type={activeSection === 'jobs' ? 'job' : 'tasks'} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Helmet><title>EarnFi - {appName}</title></Helmet>
      {user ? <DashboardLayout user={user} sidebarData={sidebarData} sidebarDataType={`${role}`}>{Content}</DashboardLayout>
           : <Layout push={true}>{Content}</Layout>}

      <Offcanvas title={`${Offtitle}`}>
        {OffId === 'create_job_or_task' && <EarnFiCreateForm type={`${offerType}`}/>}
        {OffId === 'submit_job_or_task' && <EarnFiOfferDetail offer={earnFiOffer}/>}
      </Offcanvas>
    </>
  );
}
