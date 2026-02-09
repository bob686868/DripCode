import React from 'react'
import '../globals.css'
const layout = ({children}) => {
  return (
    <html >
        <body className='bg-[#0f172a] h-screen [&::-webkit-scrollbar]:hidden'>
            {children}
        </body>
    </html>
  )
}

export default layout
