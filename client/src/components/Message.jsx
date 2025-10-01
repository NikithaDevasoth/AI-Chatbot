import React, { useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import "prismjs/themes/prism.css"

const Message = ({message}) => {
  const msgRef = useRef(null)

  useEffect(()=>{
    if(message?.content && msgRef.current){
      Prism.highlightAllUnder(msgRef.current)
    }
  },[message?.content])

  if(!message) return null

  return (
    <div>
      {message.role==="user"?(
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl' >
            <p className='text-sm dark:text-primary'>{message.content}</p>
            <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
          </div>
          <img src={assets.user_icon } alt="" className='w-8 rounded-full dark:invert'/>
        </div>
      ):(
        <div ref={msgRef} className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20
        dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4' >
          {message.isImage?(
            <img src={message.content} alt='' className='w-full max-w-md mt-2
            rounded-md'/>
          ):
          (
            <div className='text-sm dark:text-primary reset-tw'>
              <Markdown
                components={{
                  // ✅ Fix: prevent <pre> inside <p>
                  p({children}) {
                    return <div className="mb-2">{children}</div>
                  },
                  code({className,children}) {
                    const lang = className?.replace("language-","") || ""
                    return (
                      <pre className={`language-${lang}`}>
                        <code className={`language-${lang}`}>{children}</code>
                      </pre>
                    )
                  }
                }}
              >
                {message.content}
              </Markdown>
            </div>
          )}
          <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span>
        </div>
      )}
    </div>
  )
}

export default Message
