import { Avatar, Card, CardBody, Modal ,ModalContent , ModalHeader , ModalBody , ModalFooter , Button , useDisclosure, Textarea, } from '@heroui/react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";
import { useRef , useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ImSpinner9 } from 'react-icons/im';
import { Vortex } from 'react-loader-spinner';

import img1 from '../assets/images/images3.png'

export default function CreatePost() {

  const {isOpen , onOpen , onOpenChange , onClose} = useDisclosure();
  const [imagePreview, setimagPreview] = useState(null)
 const imgInput = useRef(null)
 const captioninput = useRef(null)

  function handleChangeImg(e)
  {
    setimagPreview(URL.createObjectURL(e.target.files[0]))
  }

  function handleclearimg()
  {
    imgInput.current.value = ''
    setimagPreview(null)
  }

  function handleCreatePost()
  {
    const Postobj = new FormData()

    if(captioninput.current.value)
    {
      Postobj.append('body' ,  captioninput.current.value)

    }
    if(imgInput.current.value)
    {
      Postobj.append('image' , imgInput.current.files[0] )

    }

  return axios.post('https://route-posts.routemisr.com/posts' , Postobj ,{ headers: {Token : localStorage.getItem('tkn')}} )
  }
    
   const QueryClientobj = useQueryClient()

 const { mutate , isPending } =  useMutation({
    mutationFn : handleCreatePost,
    onSuccess : () => { 
      toast.success('CreatedPost successfully' , { autoClose : 3000 , closeOnClick : true })
      handleclearimg()
      captioninput.current.value = ''
      onClose()
      QueryClientobj.invalidateQueries( { queryKey : [ "GetPosts" ] , exact : true } )
    },
    onError : () => {toast.error('ErrorPost')} ,
  })

  return (
   <>
   {isPending && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
        <Vortex
          visible={true}
          height="60"
          width="60"
          ariaLabel="vortex-loading"
          colors={["#334155", "#475569", "#64748B", "#94A3B8", "#CBD5E1", "#1E293B"]}
        />
      </div>
    )}
   <Card className='bg-[#18191A] my-2'>
   <CardBody className='flex flex-row items-center'>
 
    
      <img className='w-10' src={img1} alt="" />

   <div onClick={onOpen} className='bg-[#242526] ml-1.5 cursor-pointer w-full mx-auto flex p-2 text-white rounded-2xl'>
   <p className='text-[#B0B3B8]'>What are you thinking?</p>

   </div>
  </CardBody>
    
   </Card>
   


  
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">Create Post New</ModalHeader>


              <ModalBody>

             <div className='flex items-center gap-2'>
             <img className='w-10' src={img1} alt="" />
             <h1>Youssef</h1>
             </div>


             <Textarea ref={captioninput} placeholder='What are you thinking?'/>


              {imagePreview && 
             <div className='relative'>
              <img src={imagePreview} className='rounded-2xl w-full max-w-[500px]' alt="" />
              <IoCloseCircleOutline onClick={handleclearimg} className='absolute top-2 right-2 z-999 text-white cursor-pointer text-2xl'/>
             </div>}


             
              </ModalBody>



              <ModalFooter className='items-center'>

               <label>
               <FaRegImage className='text-[#09c]' />
                <input type="file" ref={imgInput} hidden onChange={handleChangeImg} />
               </label>

                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
               <Button color="primary" disabled={isPending} onPress={mutate}>
                  Post
                </Button>
              </ModalFooter>

            </>
          )}
        </ModalContent>
      </Modal>

    </>

   
  )
}
