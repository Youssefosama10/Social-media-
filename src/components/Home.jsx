import React, { useContext , useEffect, useState } from 'react'
// import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react"
import { authContext } from '../context/AuthContext'
import axios from 'axios'
import PostCard from './PostCard'
import Loading from './Loading';
import { useQuery } from '@tanstack/react-query';
import CreatePost from './CreatePost';

export default function Home() {

 
  // const [ AllPosts , setAllposts ] = useState(null)
  // const [ isLoading , setisLoading ] = useState(false)
  // const [ isError , setisError ] = useState(false)

  // function getAllPosts()
  // {
  //   setisLoading(true)
  //   axios.get('https://route-posts.routemisr.com/posts' , {headers : { token : localStorage.getItem('tkn')}})
  //   .then(function(reps){
  //     // console.log('reps' , reps.data.data.posts);
  //     setAllposts(reps.data.data.posts)
      
  //   })
  //   .catch(function(error){
  //     console.log('error' , error);
  //     setisError(true)
  //   })
  //   .finally(function(){setisLoading(false)})
  // }

  // useEffect( () => {getAllPosts()} , [])


function GetAllPosts()
{
 return axios.get('https://route-posts.routemisr.com/posts' , {headers : { token : localStorage.getItem('tkn')}})
}

const { data , isError , isLoading , error  } =  useQuery({
    queryKey:[ "GetPosts" ] ,
    queryFn : GetAllPosts ,
    // refetchInterval : 1000 * 60 * 60 , 
    // retry: 3 ,
    // retryDelay : 2000 ,
    // staleTime : 10000 , 
    // gcTime : 1000 * 60 * 60
  })

  

  if(isLoading)
  {
    return <Loading/>
  }
  
  if(isError)
  {
    return <h2>Errorrrrr</h2>
  }

  const AllPosts = data.data.data.posts 

  return (
    <div className="bg-[#F0F2F5] w-full sm:w-11/12 md:w-3/4 lg:w-1/2 mx-auto flex flex-col gap-5 px-2 sm:px-0 py-4">
      <CreatePost/>
 
      { AllPosts.map( post => <PostCard key={post._id} queryKey={[ "GetPosts" ]} postinfo = {post}/>  ) }

    </div>
  )
}
