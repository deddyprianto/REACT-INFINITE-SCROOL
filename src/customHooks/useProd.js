import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useProd(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    axios({
      method: 'POST',
      url: 'https://api-pink-city.proseller-demo.com/product/api/productpreset/loaditems/webOrdering/2d78d587-c36d-4083-86ec-96878d5cca6c/e73e0f7c-9aa3-4623-a2d7-e3503a2f9656',
      params: { page: pageNumber },
    }).then(res => {  
      setBooks(prevBooks => {
          if(hasMore){
            return [...new Set([...prevBooks, ...res.data.data])]
          }else{
            return [...new Set([...res.data.data])]
          }
      })
      setHasMore(res.data.data.length > 0)
      setLoading(false)
    }).catch(e => {
      setError(true)
    })
  }, [pageNumber])

  return { loading, error, books ,hasMore}
}
