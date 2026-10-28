import { Fade } from 'react-awesome-reveal';
import SendRequest from '../Tools/SendRequest';
import { useState } from 'react';
import { classMap } from '../Tools/Misc';

export const Newsletter = () => {
  const [data, setData] = useState({
    name: "",
    email: ""
  });
  
  const handleChange = (e:any) => {
    const { name, value, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <section className="bg-[#0d0f11] py-10 px-3">
      <div className="max-w-3xl mx-auto text-center">
        <Fade triggerOnce>
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--primary)] mb-4">
            Subscribe to our <h2 className="text-[var(--secondary)] inline">Newsletter</h2>
          </h2>
          <h6 className="text-gray-400 max-w-xl mx-auto">
            Looking to keep track with PhiFinance and not miss anything? Subscribe to our newsletter to stay connected. <br/>You can unsubscribe anytime.
          </h6>
        </Fade>

        <form className="mt-10 grid gap-4 md:grid-cols-3 items-center">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-3 rounded-md bg-[#1e1f22] text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-[#3dffc5]"
            name='name'
            value={data.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter email"
            className={`${classMap.input()}`}
            name='email'
            value={data.email}
            onChange={handleChange}
          />
          <SendRequest
          text='Subscribe'
          url={`/newsletter/subscribe`}
          data={data}
          loadingText='Subscribing....'
          onResponse={() => {}}
          direction='right'
          />
        </form>
      </div>
    </section>
  );
};

