import { Input } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowRight,  } from "react-icons/fa";
import { toast } from 'react-toastify';
import { ImSpinner9 } from "react-icons/im";

export default function CreateComment({id , queryKey}) {
  // console.log(id);
  
  const [ CommentValue , setCommentValue ] = useState('')

    function handleAddComment()
    {
      const Commentobj = {content : CommentValue}

     return axios.post(`https://route-posts.routemisr.com/posts/${id}/comments`,Commentobj , {headers : {Token : localStorage.getItem('tkn')}} )
    }

     const QueryClientobj =  useQueryClient()

   const { mutate: CreateCommentMutation , isPending } =  useMutation({
   mutationFn : handleAddComment, 
   onSuccess : () => {  
      toast.success('CreatedComment')
      if (queryKey) {
        QueryClientobj.invalidateQueries({ queryKey })
      }
      // Always refresh post details and comments for this post
      QueryClientobj.invalidateQueries({ queryKey: ['GetPostDetails'] })
      QueryClientobj.invalidateQueries({ queryKey: ['GetPostComments', id] })
      setCommentValue('')
    },
    onError : () => {toast.error('ErrorComment')},
    onSettled : () => {}
    })

  return (
   <>   
 <div className='p-2'>
 <Input
          
          labelPlacement="outside"
          placeholder="Comment New"
          
          endContent={
              <div onClick={CreateCommentMutation}  className='bg-[#09c] cursor-pointer text-white rounded-full p-2'>

                { isPending ? <ImSpinner9  className='animate-spin' />  :   <FaArrowRight /> }
                {/* { isPending ? <FaSpinner className='animate-spin' />  :   <FaArrowRight /> } */}
                   
              </div>
          }
          type="text"
          value={CommentValue}
          onChange={ (e) => setCommentValue(e.target.value) }
        />

 </div>
    </>
  )
}
