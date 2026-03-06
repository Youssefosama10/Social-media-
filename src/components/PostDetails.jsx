import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import PostCard from './PostCard'

export default function PostDetails() {
 const { id } =  useParams()

  function GetPostDetails()
  {
   return axios.get(`https://route-posts.routemisr.com/posts/${id}` , { headers : { Token : localStorage.getItem('tkn') } })
  }

  function GetPostComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`, {
      headers: { Token: localStorage.getItem('tkn') },
    })
  }

  const {
    data,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['GetPostDetails', id],
    queryFn: GetPostDetails,
  })

  const {
    data: commentsData,
    isError: isCommentsError,
    isLoading: isCommentsLoading,
  } = useQuery({
    queryKey: ['GetPostComments', id],
    queryFn: GetPostComments,
  })
  
  const PostDetailsObj = data?.data.data.post
  const comments = commentsData?.data.data.comments || []

  if (isLoading || isCommentsLoading) {
    return <Loading/>
  }
    
  if (isError || isCommentsError) {
    return <h2>Errorrrrr</h2>
  }
 
  const PostDetailsWithComments = {
    ...PostDetailsObj,
    comments,
  }

  return (
   <>
   <div className="w-full max-w-2xl mx-auto px-2 sm:px-0 py-4">
     <PostCard postinfo={PostDetailsWithComments} isPostDetails queryKey={['GetPostDetails']}/>
   </div>
    </>
  )
}
