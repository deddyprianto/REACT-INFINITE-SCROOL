import React, { useState, useRef, useCallback } from 'react'
import useProd from './customHooks/useProd'

const CustomScroll = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const {
    books,
    loading,
    error,
    hasMore
  } = useProd(pageNumber)

  const observer = useRef();
  const lastEl = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading,hasMore]
  );
  return (  
    <div>
   <div>
            {books.map((catItem,i) => {
                if (books.length === i + 1) {
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
            }
          </div>
        <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
  )
}

export default CustomScroll