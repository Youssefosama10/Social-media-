import img1 from '../assets/images/images2.png'
import img2 from '../assets/images/images1.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import axios from 'axios'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Vortex } from 'react-loader-spinner'
import { authContext } from '../context/AuthContext'

const LoginSchema = zod.object({
  email: zod
    .string()
    .nonempty('Email is required')
    .email('Email is invalid'),
  password: zod.string().nonempty('Password is required'),
})

export default function Login() {

 const { setAuthenticatedUserToken } = useContext(authContext)

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  function handleLoginSubmit(values) {
    console.log('login submit', values)
    setIsLoading(true)

    axios
      .post('https://route-posts.routemisr.com/users/signin', values)
      .then(function (resp) {
        // console.log('login res', resp.data.data.token)
        const userToken = resp.data.data.token

        setAuthenticatedUserToken(resp.data.data.token)
        localStorage.setItem("tkn" , resp.data.data.token )
        toast.success('Logged in successfully')
       setTimeout(() => {
         navigate('/Home')
       }, 1000);
      })
      .catch(function (error) {
        console.log('login error', error?.response?.data)
        const msg = error?.response?.data?.message || 'Login failed'
        toast.error(msg)
      })
      .finally(function () {
        setIsLoading(false)
      })
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* الشمال */}
          <div
            style={{
              backgroundImage: `
        linear-gradient(to right, rgba(39, 92, 225, 1), rgba(39, 92, 225, 0.5)),
    url(${img2})
    `,
            }}
            className="lg:col-span-7 p-4 min-h-screen  bg-cover bg-center"
          >
            <div className="flex items-center">
              <div>
                <div className="bg-[#7C9FEF]  w-12 h-12 rounded-2xl text-2xl text-white flex justify-center items-center p-2">
                  s
                </div>
              </div>

              <div>
                <h2 className="ml-2 text-2xl text-white"> SocialHub</h2>
              </div>
            </div>

            <div className="mt-12">
              <h1 className="text-4xl font-bold text-white">
                Welcome back to <br />{' '}
                <span className="text-[#BCF7FE]">your social world</span>
              </h1>

              <p className="text-white mt-3">
                Log in to continue sharing moments, ideas, and building
                <br /> meaningful connections every day
              </p>
            </div>

            <div className="flex items-center flex-wrap mt-5">
              <div className="bg-white/40 mr-8 rounded-2xl mt-2 w-80 hover:scale-105 transition-all p-3.5 flex items-center m">
                <div className="bg-green-200 rounded-2xl w-fit p-2">
                  <i className="fa-solid fa-message text-[#7BF1A8]"></i>
                </div>

                <div className="ml-2 text-white">
                  <h4>Real-time Chat</h4>
                  <p>Instant messaging</p>
                </div>
              </div>

              <div className="bg-white/40 rounded-2xl mt-2 w-80 hover:scale-105 transition-all p-3.5 flex items-center m">
                <div className="bg-blue-400 rounded-2xl w-fit p-2">
                  <i className="fa-regular fa-image text-white"></i>
                </div>

                <div className="ml-2 text-white">
                  <h4>Share Media</h4>
                  <p>Photos & videos</p>
                </div>
              </div>

              <div className="bg-white/40 mr-8 rounded-2xl mt-2 w-80 hover:scale-105 transition-all p-3.5 flex items-center m">
                <div className="bg-pink-400 rounded-2xl w-fit p-2">
                  <i className="fa-solid fa-bell text-white"></i>
                </div>

                <div className="ml-2 text-white">
                  <h4>Smart Alerts</h4>
                  <p>Stay updated</p>
                </div>
              </div>

              <div className="bg-white/40 rounded-2xl mt-2 w-80 hover:scale-105 transition-all p-3.5 flex items-center m">
                <div className="bg-green-100 rounded-2xl w-fit p-2">
                  <i className="fa-solid fa-users text-green-300"></i>
                </div>

                <div className="ml-2 text-white">
                  <h4>Communities</h4>
                  <p>Find your tribe</p>
                </div>
              </div>
            </div>

            <div className="w-150 mt-10 flex">
              <div className="p-2">
                <div className="flex items-center">
                  <div>
                    {' '}
                    <i className="fa-solid fa-users text-xl text-white"></i>
                  </div>
                  <div className="text-2xl ml-2 text-white font-bold">2M+</div>
                </div>
                <span className="text-white ">Active Users</span>
              </div>

              <div className="p-2">
                <div className="flex items-center">
                  <div>
                    {' '}
                    <i className="fa-solid fa-heart text-white"></i>
                  </div>
                  <div className="text-2xl ml-1 text-white font-bold">
                    10M+
                  </div>
                </div>
                <span className="text-white">Posts Shared</span>
              </div>

              <div className="p-2">
                <div className="flex items-center">
                  <div>
                    {' '}
                    <i className="fa-solid fa-message text-xl text-white"></i>
                  </div>
                  <div className="text-2xl ml-2 text-white font-bold">
                    50M+
                  </div>
                </div>
                <span className="text-white">Messages Sent</span>
              </div>
            </div>

            <div className="bg-white/30 p-3 rounded-2xl mt-3">
              <i className="fa-solid fa-star text-amber-300 "></i>
              <i className="fa-solid fa-star text-amber-300 "></i>
              <i className="fa-solid fa-star text-amber-300 "></i>
              <i className="fa-solid fa-star text-amber-300 "></i>
              <i className="fa-solid fa-star text-amber-300 "></i>

              <p className="text-white font-semibold">
                "SocialHub makes it easy to stay in touch and never miss what
                matters most. Logging in is all it takes to feel connected!"
              </p>

              <div className="flex items-center mt-3">
                <div>
                  <img className="w-20 rounded-full" src={img1} alt="" />
                </div>

                <div className="ml-1.5 text-white">
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
                    Sign in to your account
                  </h1>
                  <p className="text-sm text-gray-500 mt-2">
                    Don&apos;t have an account?{' '}
                    <Link
                      to="/register"
                      className="text-blue-500 cursor-pointer hover:underline"
                    >
                      Sign up
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
                    <span className="text-sm font-medium">Facebook</span>
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

                <form onSubmit={handleSubmit(handleLoginSubmit)}>
                  {/* Email */}
                  <div className="mb-4">
                    <label
                      htmlFor="login-email"
                      className="block text-sm text-gray-600 mb-2"
                    >
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
                        id="login-email"
                        {...register('email')}
                      />
                    </div>
                    {formState.errors.email && (
                      <p className="text-red-500">
                        {formState.errors.email?.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-5">
                    <label
                      htmlFor="login-password"
                      className="block text-sm text-gray-600 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        🔒
                      </span>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                        id="login-password"
                        {...register('password')}
                      />
                    </div>
                    {formState.errors.password && (
                      <p className="text-red-500">
                        {formState.errors.password?.message}
                      </p>
                    )}
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm
          bg-gradient-to-r from-gray-600 to-gray-400
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
                          colors={[
                            '#334155',
                            '#475569',
                            '#64748B',
                            '#94A3B8',
                            '#CBD5E1',
                            '#1E293B',
                          ]}
                        />
                      </span>
                    ) : (
                      'Sign In →'
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

