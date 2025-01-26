import React, { useState, useEffect } from 'react'
import axios from 'axios'

const VisitorFooter = () => {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://hindi-quotes.vercel.app/random')

      setQuote(res.data.quote)
    }
    fetchData()
  }, [])

  return (
    <footer className="bg-dark text-white p-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <blockquote className="blockquote text-center w-50">
              <p className="mb-0">{quote}</p>
            </blockquote>
          </div>
          <div className="col-md-6 text-right">
            <p>
              Copyright &copy; {new Date().getFullYear()} Poet's Poetry. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default VisitorFooter