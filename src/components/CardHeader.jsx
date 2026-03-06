import { CardHeader , Image} from "@heroui/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";


  const STATIC_IMAGE = "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
export default function MyCardHeader({ name , createdAt , photo , userCradID , cradID  , cardType , onEdit , postId }) {

 const { uesrId , userToken } = useContext(authContext)

  const myID = userCradID === uesrId

  function handleDaleteCard()
  {
    let url = ""

    if (cardType === "post") {
      url = `https://route-posts.routemisr.com/posts/${cradID}`
    } else {
      url = `https://route-posts.routemisr.com/posts/${postId}/comments/${cradID}`
    }

    return axios.delete(url , { headers :   { Token : userToken }})
  }

   const QueryClient = useQueryClient()

 const { isPending , mutate: handelDaletpost} = useMutation({
   mutationFn : handleDaleteCard ,
   onSuccess : () => {
      const successMessage = cardType === 'post' ? "Deleted post successfully" : "Deleted comment successfully"
      toast.success(successMessage , { autoClose : 2000  ,  closeOnClick : true })
      // Refresh posts list
      QueryClient.invalidateQueries({ queryKey : [ "GetPosts" ] })
      // Also refresh post details and comments when relevant
      QueryClient.invalidateQueries({ queryKey: ['GetPostDetails'] })
      if (cardType !== 'post' && postId) {
        QueryClient.invalidateQueries({ queryKey: ['GetPostComments', postId] })
      }
    },
   onError : () => {
      const errorMessage = cardType === 'post' ? "Error deleting post" : "Error deleting comment"
      toast.error(errorMessage , { autoClose : 2000  ,  closeOnClick : true })
    }


  })

  return (
    <>
   <CardHeader className="flex justify-between">
      <div className="flex gap-3">
      <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src={photo}
          width={40}
          onError={(e)=> { e.target.src = STATIC_IMAGE }}
        />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-small text-default-500">{createdAt}</p>
        </div>
      </div>

        <div>
          



      {myID && 
          <Dropdown isDisabled ={isPending}>
      <DropdownTrigger>
        <i className="fa-solid fa-ellipsis cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {cardType === 'post' && <DropdownItem key="edit" onClick={onEdit}>Edit post</DropdownItem>}
        <DropdownItem key="delete" onClick={handelDaletpost} className="text-red-600" color="danger">
          Delete {cardType}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>}






        </div>
      </CardHeader>
    </>
  )
}
