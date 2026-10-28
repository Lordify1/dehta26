import { Head } from "@inertiajs/react";
import { Footer } from "../../components/Main/Footer";
import { IoConstructOutline } from "react-icons/io5";

const UC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0e0e0e] text-white" scroll-region={true}>
      <Head title="Under Construction"/>
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <IoConstructOutline className="text-5xl md:text-7xl text-[#3dffc5] mb-6 animate-pulse" />
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Under Construction</h1>
        <p className="max-w-xl text-gray-400">
          We're busy building something amazing. Please check back soon to see our new and improved site!
        </p>
      </main>
      <Footer
      partial={true}
      />
    </div>
  );
};

export default UC;