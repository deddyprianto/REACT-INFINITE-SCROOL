import React,{useRef,useCallback} from 'react'
import { isDocumentDefined } from 'swr/_internal';
import {useCat} from './customHooks/useCat';

const InfiniteScrool = () => {
  const { cat, isError, isLoading, setSize, size } = useCat();
  let totalCat = 0;
  
  for (let i = 0; i < cat?.length; i++) {
    totalCat += cat[i]?.length;
  }
  const observer = useRef();
  const lastEl = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  return (
    <div className='w-full bg-gray-300 h-screen overflow-y-auto'>
      <h1  className='text-black pt-10 text-center font-bold text-xl'>TOTAL ALL CAT LIST ON YOUR PAGE INFINITE SCROOL ASD{totalCat}</h1>
      <div className='w-full flex justify-center items-center'>
        <div className='w-5/6 md:w-2/5 flex justify-center items-center rounded-xl bg-white p-1 mt-10'>
        <input type="text" onChange={(e) => count.value = e.target.value}  className='w-full outline-none' placeholder='Search you want to search' />
        </div>
      </div>
        <div className='flex justify-center mt-10'>
          <ul >
            {isLoading ? <p>Loading... </p> : isError ? <p>{isError}</p> : cat?.map((item) => {
              return item?.map((catItem,i) => {
                if (item?.length === i + 1) {
                  return (
                    <div ref={lastEl} key={i} className="mt-10">
                      <div>
                        <button
                          className="flex items-center focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                            {catItem.name}
                          </h1>
                        </button>
                      
                      </div>
                      <hr className="my-8 border-gray-200 dark:border-gray-700" />
                    </div>
                  );
                } else {
                  return (
                    <div  key={i} className="mt-10">
                      <div>
                        <button
                          className="flex items-center focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                            {catItem.name}
                          </h1>
                        </button>
                      </div>
                      <hr className="my-8 border-gray-200 dark:border-gray-700" />
                    </div>
                  );
                }
              })
            })}
          </ul>
        </div>
        <div>
            <h1
              className={`text-gray-600 ${
                size === 1 ? "hidden" : "inline"
              }`}
            >
              Loading...
            </h1>
          </div> 
    </div>
  )
}

export default InfiniteScrool