
// import { Link, Outlet } from 'react-router-dom'
import img1 from '../assets/images/images2.png'
import img2 from '../assets/images/images1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Vortex } from 'react-loader-spinner'


const RegisterSchema = zod.object({
  name : zod.string().nonempty("Full Name is required").min(3 , "Full Name must be at least 3 characters").max(20 , "Full Name must be maximum 13 characters") , 
  email : zod.string().nonempty("Email is required").email("Email is invalid"), 
  password : zod.string().nonempty("password is required ").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Invalid password format. Please follow the required rules.") , 
  rePassword :zod.string().nonempty("Repassword is requird").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Invalid password format. Please follow the required rules.") , 
  dateOfBirth : zod.coerce.date("invalid Date").refine(function(Vaule){
    
 return new Date().getFullYear() - Vaule.getFullYear() >= 8 ? true : false

  } , "Age must be at least 8" ).transform(function(valueBeforeTransform){
    return `${valueBeforeTransform.getFullYear()}-${valueBeforeTransform.getMonth() + 1}-${valueBeforeTransform.getDate()}`
  }) , 
  gender : zod.enum([ 'male' , 'female' ]) , 
}).refine(function(obj){
 return obj.password === obj.rePassword 
} , {path : ['rePassword'] , error : "passwords are inmatch"} )


export default function Register() {

const [isLoading , setisLoading] = useState(false);
const navigate = useNavigate()

 const { handleSubmit , register , formState , setError } = useForm({
  defaultValues :
  {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:""
},
resolver : zodResolver(RegisterSchema)
 })

function MyHandalSubmit(values)
{ 
  console.log("handalSubmit" , values);
  setisLoading(true);

axios.post('https://route-posts.routemisr.com/users/signup' , values)
.then(function(resp){
  console.log("res" , resp.data);
  // setisSuccessResponse(true)

  toast.success("Account created successfully")
  navigate('/login')
})
.catch(function(error){
  const message = error.response?.data?.error ?? "user already exists";
  console.log("error", message);
  toast.error(message);
}).finally(function(){
  setisLoading(false)
})

}

  return (


  <>

  
  <div className="container mx-auto">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

    {/* الشمال */}
<div  style={{
    backgroundImage: `
        linear-gradient(to right, rgba(39, 92, 225, 1), rgba(39, 92, 225, 0.5)),
    url(${img2})
    `
  }} className="lg:col-span-7 p-4 min-h-screen  bg-cover bg-center">
    
 <div className='flex items-center'>
      <div>
       <div className='bg-[#7C9FEF]  w-12 h-12 rounded-2xl text-2xl text-white flex justify-center items-center p-2'>s</div>
     </div>
     
     <div>
       <h2 className='ml-2 text-2xl text-white'> SocialHub</h2>
     </div>
 </div>

<div  className='mt-12'>
  <h1 className='text-4xl font-bold text-white'>Conncet width <br /> <span className='text-[#BCF7FE]'>amazing people</span></h1>

 <p className='text-white mt-3'>Join millions of users sharing moments, ideas, and building <br /> meaningful connections every day</p>
</div>


<div className='flex items-center flex-wrap mt-5'>

<div className='bg-white/40 mr-8 rounded-2xl mt-2 w-80 hover:scale-105 transition-all p-3.5 flex items-center m'>

<div className='bg-green-200 rounded-2xl w-fit p-2'>
 <i class="fa-solid fa-message text-[#7BF1A8]"></i>
</div>

<div className='ml-2 text-white'>
  <h4>Real-time Chat</h4>
  <p>Instant messaging</p>
</div>

</div>

<div className='bg-white/40 rounded-2xl mt-2 w-80 hover:scale-105 transition-all p-3.5 flex items-center m'>

<div className='bg-blue-400 rounded-2xl w-fit p-2'>
 <i class="fa-regular fa-image text-white"></i>
</div>

<div className='ml-2 text-white'>
  <h4>Share Media</h4>
  <p>Photos & videos</p>
</div>

</div>

<div className='bg-white/40 mr-8 rounded-2xl mt-2 w-80 hover:scale-105 transition-all p-3.5 flex items-center m'>

<div className='bg-pink-400 rounded-2xl w-fit p-2'>
 <i class="fa-solid fa-bell text-white"></i>
</div>

<div className='ml-2 text-white'>
  <h4>Smart Alerts</h4>
  <p>Stay updated</p>
</div>

</div>

<div className='bg-white/40 rounded-2xl mt-2 w-80 hover:scale-105 transition-all p-3.5 flex items-center m'>

<div className='bg-green-100 rounded-2xl w-fit p-2'>
 <i className="fa-solid fa-users text-green-300"></i>
</div>

<div className='ml-2 text-white'>
  <h4>Communities</h4>
  <p>Find your tribe</p>
</div>

</div>

</div>


<div className='w-150 mt-10 flex'>


<div className='p-2'>

<div className='flex items-center'>
    <div> <i className="fa-solid fa-users text-xl text-white"></i></div>
  <div className='text-2xl ml-2 text-white font-bold'>2M+</div>

</div>
  <span className='text-white '>Active Users</span>
</div>


<div className='p-2'>

<div className='flex items-center'>
    <div> <i class="fa-solid fa-heart text-white"></i></div>
  <div className='text-2xl ml-1 text-white font-bold'>10M+</div>

</div>
  <span className='text-white'>Posts Shared</span>
</div>


<div className='p-2'>

<div className='flex items-center'>
    <div> <i class="fa-solid fa-message text-xl text-white"></i></div>
  <div className='text-2xl ml-2 text-white font-bold'>50M+</div>

</div>
  <span className='text-white'>Messages Sent</span>
</div>

</div>


<div className='bg-white/30 p-3 rounded-2xl mt-3'>


<i class="fa-solid fa-star text-amber-300 "></i>
<i class="fa-solid fa-star text-amber-300 "></i>
<i class="fa-solid fa-star text-amber-300 "></i>
<i class="fa-solid fa-star text-amber-300 "></i>
<i class="fa-solid fa-star text-amber-300 "></i>

<p className='text-white font-semibold'>"SocialHub has completely changed how I connect with friends and discover new <br /> communities. The experience is seamless!"</p>

<div className='flex items-center mt-3'>

<div>
  <img className='w-20 rounded-full' src={img1} alt="" />
</div>

<div className='ml-1.5 text-white'>
<h3>Alex Johnson</h3>
<p>Product Designer</p>
</div>

</div>

</div>



</div>

    {/* اليمين */}
<div className="lg:col-span-5 bg-[#F3F4F6]   p-4">
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2.5 bg-gray-50 hover:bg-gray-100 transition">
            <span className="text-red-500 font-bold">G</span>
            <span className="text-sm font-medium text-gray-700">
              Google
            </span>
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-white bg-blue-600 hover:bg-blue-700 transition">
            <span className="font-bold">f</span>
            <span className="text-sm font-medium">
              Facebook
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-xs text-gray-400">
            or continue with email
          </span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>



    <form onSubmit={handleSubmit(MyHandalSubmit)}>
          {/* Full Name */}
        <div className="mb-4">
          <label htmlFor='Full Name' className="block text-sm text-gray-600 mb-2">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              👤
            </span>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              id='Full Name'
              {...register('name')}
            />
          </div>
          {formState.errors.name && formState.touchedFields.name &&   <p className='text-red-500'>{formState.errors.name?.message}</p>}
       
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor='Email Address' className="block  text-sm text-gray-600 mb-2">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              ✉️
            </span>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              id=' Email Address'
              {...register('email')}
            />
          </div>
            {formState.errors.email && formState.touchedFields.email && <p className='text-red-500'>{formState.errors.email?.message}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor=' Password' className="block text-sm text-gray-600 mb-2">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔒
            </span>
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              id=' Password'
             {...register('password')}
            />
          </div>
          {formState.errors.password && formState.touchedFields.password && <p className='text-red-500'>{formState.errors.password?.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-5">
          <label htmlFor='Confirm Password' className="block text-sm text-gray-600 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔒
            </span>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              id='Confirm Password'
              {...register('rePassword')}
            />
          </div>
           {formState.errors.rePassword && formState.touchedFields.rePassword && <p className='text-red-500'>{formState.errors.rePassword?.message}</p>}
        </div>

        {/* Date + Gender */}
        <div className="flex gap-3 mb-6">
          <div className="w-1/2">
            <label htmlFor='Date Of Birth' className="block text-sm text-gray-600 mb-2">
              Date Of Birth
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              id='Date Of Birth'
              {...register('dateOfBirth')}
              />
             {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && <p className='text-red-500'>{formState.errors.dateOfBirth?.message}</p>}
             </div>

          <div className="w-1/2">
            <label htmlFor='Gender' className="block text-sm text-gray-600 mb-2">
              Gender
            </label>
            <select
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 appearance-none"
              id='Gender'
              {...register('gender')}
              >
              
              <option value='' >Select your gender</option>
              <option value='male'>male</option>
              <option value='female' >female</option>
            </select>
              {formState.errors.gender && formState.touchedFields.gender && <p className='text-red-500'>{formState.errors.gender?.message}</p>}
             
          </div>
          
        </div>

        {/* Button */}
        <button
          className="w-full py-3 rounded-xl text-white font-semibold text-sm
          bg-linear-to-r from-gray-600 to-gray-400
          hover:opacity-90 transition"
          disabled={isLoading}
        >
         {isLoading ? (
          <span className="inline-flex justify-center items-center">
            <Vortex
              visible={true}
              height="40"
              width="40"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={[   "#334155",
                "#475569",
                "#64748B",
                "#94A3B8",
                "#CBD5E1",
                "#1E293B"]}
            />
          </span>
        ) : (
          ' Create Account →'
        )}
        </button>
</form>

      </div>
    </div>

</div>

  </div>
</div>

  </>
  )
}


