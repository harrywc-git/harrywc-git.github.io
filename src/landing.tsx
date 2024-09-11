import Backdrop from "@components/backdrop";
import CloseIcon from "@components/closeicon";
import GithubIcon from "@components/githubicon";
import { useState } from "react";

const Landing = () => {
  const [showContacts, setShowContacts] = useState<Boolean>(false);
  return (
    <>
      <Backdrop />
      <div className="flex flex-col absolute items-center top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%]">
        <a
          className="relative mr-auto mb-[10px]"
          href="https://github.com/harrywc-git"
        >
          <GithubIcon />
        </a>
        {showContacts ? (
          <div className="bg-white flex flex-col">
            <button onClick={() => setShowContacts(false)} className="ml-auto">
              <CloseIcon />
            </button>
            <h3 className="text-4xl font-semibold">jcceong@gmail.com</h3>
            <h3 className="text-4xl font-light">604-442-7295</h3>
          </div>
        ) : (
          <div className="bg-white">
            <h1 className="text-6xl font-semibold">Harry Ceong</h1>
            <h2 className="text-4xl font-light">Full Stack Engineer</h2>
          </div>
        )}
        <button
          onClick={() => setShowContacts(true)}
          className="bg-white hover:bg-slate-400 transition-all hover:translate-y-[5px] p-[10px] mt-[10px] border-black border-[1px] border-solid"
        >
          Contact me
        </button>
      </div>
    </>
  );
};

export default Landing;
