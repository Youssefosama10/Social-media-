import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, useDisclosure} from "@heroui/react";
import MyCardHeader from "./CardHeader";
import { Link } from "react-router-dom";
import CreateComment from "./CreateComment";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { ImSpinner9 } from "react-icons/im";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegImage } from "react-icons/fa6";

export default function PostCard( { postinfo , isPostDetails = false , queryKey }) {

  const { body , image , createdAt , id  } = postinfo 
  const { name , photo , _id } = postinfo.user

  const topComment = postinfo.topComment?.content
  const allComments = isPostDetails ? (postinfo.comments || []) : []

  // Prefer backend-provided comments count when available
  const commentsCount = typeof postinfo.commentsCount === "number"
    ? postinfo.commentsCount
    : allComments.length

  const CommentsNumbar = !isPostDetails ? commentsCount : allComments.length

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [editCaption, setEditCaption] = useState(body || "");
  const [editImagePreview, setEditImagePreview] = useState(image || null);
  const [editImageFile, setEditImageFile] = useState(null);
  const imgInputRef = useRef(null);

  const queryClient = useQueryClient();

  function handleUpdatePost() {
    const formData = new FormData();

    if (editCaption) {
      formData.append("body", editCaption);
    }

    if (editImageFile) {
      formData.append("image", editImageFile);
    }

    return axios.put(`https://route-posts.routemisr.com/posts/${id}`, formData, {
      headers: { Token: localStorage.getItem("tkn") },
    });
  }

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: handleUpdatePost,
    onSuccess: () => {
      toast.success("Post updated successfully", { autoClose: 3000, closeOnClick: true });
      queryClient.invalidateQueries({ queryKey: queryKey || ["GetPosts"], exact: true });
      onClose();
    },
    onError: () => {
      toast.error("Error updating post");
    },
  });

  function handleEditImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  }

  function handleClearEditImage() {
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
    setEditImageFile(null);
    setEditImagePreview(null);
  }

  function openEditModal() {
    setEditCaption(body || "");
    setEditImagePreview(image || null);
    setEditImageFile(null);
    if (imgInputRef.current) {
      imgInputRef.current.value = "";
    }
    onOpen();
  }

  return (
    <Card>
        
      <MyCardHeader
        name={name}
        createdAt={createdAt}
        photo={photo}
        userCradID={_id}
        cradID={id}
        cardType="post"
        onEdit={openEditModal}
        postId={id}
      />

      <Divider />

      <CardBody className="space-y-3">
        <p className="text-sm sm:text-base break-normal">{body}</p>
      {image &&  (
        <img
          src={image}
          className="w-full max-h-96 object-cover rounded-xl"
          alt={body}
        />
      )}
      </CardBody>

      <Divider />

      <CardFooter className="flex flex-col gap-0 px-0">

        <div className="flex justify-between items-center w-full px-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 text-default-600 hover:bg-default-100 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-thumbs-up text-gray-600" />
            <span className="text-small font-medium">Like</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 text-default-600 hover:bg-default-100 rounded-lg transition-colors"
          >
            <i className="fa-regular fa-comment" />
            <span className="text-small font-medium">comment</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 text-default-600 hover:bg-default-100 rounded-lg transition-colors"
          >
            <i className="fa-solid fa-share-from-square" />
            <span className="text-small font-medium">share</span>
          </button>
        </div>
      </CardFooter>

      <CreateComment id = {id} queryKey={queryKey} />

      {!isPostDetails && CommentsNumbar > 1 && (
        <Link to={`/PostDetails/${id}`}>
          <p className="text-center p-1 text-blue-500">View More Comments...</p>
        </Link>
      )}

      {!isPostDetails && topComment && (
        <CardFooter className="gap-0 px-0">
          <div className="bg-gray-300 w-full p-2 rounded-2xl">
            <MyCardHeader
              cardType="comment"
              cradID={postinfo.topComment._id}
              userCradID={postinfo.topComment.commentCreator._id}
              name={postinfo.topComment.commentCreator.name}
              photo={postinfo.topComment.commentCreator.photo}
              createdAt={postinfo.topComment.createdAt}
              postId={id}
            />
            <p>{topComment}</p>
          </div>
        </CardFooter>
      )}

      {isPostDetails && allComments.length > 0 && (
        <div className="flex flex-col gap-2 px-0 sm:px-2 pb-3">
          {allComments.map((comment) => (
            <CardFooter key={comment._id} className="gap-0 px-0">
              <div className="bg-gray-300 w-full p-2 rounded-2xl">
                <MyCardHeader
                  cardType="comment"
                  cradID={comment._id}
                  userCradID={comment.commentCreator._id}
                  name={comment.commentCreator.name}
                  photo={comment.commentCreator.photo}
                  createdAt={comment.createdAt}
                  postId={id}
                />
                <p>{comment.content}</p>
              </div>
            </CardFooter>
          ))}
        </div>
      )}

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">Update Post</ModalHeader>

              <ModalBody>
                <div className="flex items-center gap-2">
                  <Image
                    alt="user avatar"
                    height={40}
                    radius="sm"
                    src={photo}
                    width={40}
                  />
                  <h1>{name}</h1>
                </div>

                <Textarea
                  placeholder="What are you thinking?"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                />

                {editImagePreview && (
                  <div className="relative">
                    <img src={editImagePreview} className="rounded-2xl w-full max-w-[500px]" alt="" />
                    <IoCloseCircleOutline
                      onClick={handleClearEditImage}
                      className="absolute top-2 right-2 z-999 text-white cursor-pointer text-2xl"
                    />
                  </div>
                )}
              </ModalBody>

              <ModalFooter className="items-center">
                <label>
                  <FaRegImage className="text-[#09c]" />
                  <input
                    type="file"
                    ref={imgInputRef}
                    hidden
                    onChange={handleEditImageChange}
                  />
                </label>

                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>

                {isUpdating ? (
                  <ImSpinner9 className="animate-spin text-blue-700 text-2xl" />
                ) : (
                  <Button color="primary" disabled={isUpdating} onPress={updatePost}>
                    Update
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </Card>
  );
}
