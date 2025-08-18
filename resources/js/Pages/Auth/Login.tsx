import React, { useCallback, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/inertia-react';
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import route from 'ziggy-js'
import { GoogleReCaptcha, GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { ErrorBag, Errors, Page, PageProps } from '@inertiajs/inertia'
import { ErrorText } from '@/Components/Error'
import { Button, HomeIcon } from 'flowbite-react';
import { BiHome } from 'react-icons/bi';

interface Props extends Page<PageProps> {
  props: {
    siteKey: string
    errors: Errors & ErrorBag
  }
}

export default function Login({ role }: { role: string }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    token: '',
    role: role
  });

  const siteKey = usePage<Props>()

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);


  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('login', { role: role }));
  };

  // console.log(siteKey)
  console.log(role);


  const YourReCaptchaComponent = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async () => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }
      const token = await executeRecaptcha('');
      setData('token', token)
      // Do whatever you want with the token
    }, [executeRecaptcha]);

    // You can use useEffect to trigger the verification as soon as the component being loaded
    // useEffect(() => {
    //   handleReCaptchaVerify();
    // }, [handleReCaptchaVerify]);

    return <button onClick={handleReCaptchaVerify}>Verify recaptcha</button>;
  };
  const bg = role === 'desa' ? "bg-[url('/assets/bgbola.png')]" : "bg-[url('/assets/bglogin.png')]"
  const borders = role === 'desa' ? "border-blue-400" : "border-blue-600"
  return (
    <div className={`min-h-screen content-center ${bg}`}>
      <div className={`${borders} bg-white border-solid border-4 w-fit  md:flex md:flex-row rounded-md mx-auto min-h-fit items-center`}>
        <img src={`/assets/${role == 'desa' ? 'logindesa.webp' : 'loginbupati.webp'}`} alt="" className={'h-96 rounded-sm'} />
        <div className={'w-full h-full sm:max-w-md px-6 overflow-hidden'}>
          <a href={route('/')} className='flex items-center text-blue-600 gap-2 cursor-pointer'>
            <HomeIcon className='h-10 w-10' />
            Kembali ke SI-DiA
          </a>
          <p className='w-full mt-2 animate-pulse text-center'>SELAMAT DATANG</p>
          <form onSubmit={submit} className='mt-2'>
            <div>
              <Label forInput="email" value="Email" />
              <Input
                type="text"
                name="email"
                value={data.email}
                className="mt-1 block w-full"
                autoComplete="username"
                isFocused={true}
                handleChange={(e) => setData('email', e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Label forInput="password" value="Password" />

              <Input
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="current-password"
                handleChange={(e) => setData('password', e.target.value)}
              />
            </div>

            <div className='mt-2'>
              <a href={route('password.request', { role: role })} className="ml-auto text-sm link" tabIndex={5}>
                Forgot password?
              </a>
            </div>


            <div className="block mt-4">
              {/* <GoogleReCaptchaProvider
                reCaptchaKey={siteKey.props.siteKey}
              >
                <GoogleReCaptcha onVerify={e => {
                  if (e !== '') {
                    if (data.token === '') {
                      setData('token', e)
                    }
                  }
                }} />
              </GoogleReCaptchaProvider> */}
            </div>

            <div className="flex items-center justify-end mt-4">
              <Button color={'blue'} className="ml-4" type='submit'>
                Log in
              </Button>
            </div>
            {
              Object.keys(siteKey.props.errors).length > 0 && Object.values(siteKey.props.errors).map((e, i) => <ErrorText key={i} message={e} />)
            }
          </form>
        </div>
      </div>
    </div>


    // <div className={'min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-kemenag'}>
    //   <div className={'text-white w-full flex flex-col place-items-center'}>
    //     <img src={'/assets/logo.png'} className={'h-40 mb-2'} />
    //     <h6 className={'mx-auto'}>Login Dashboard</h6>
    //     <h6 className={'text-sm mx-auto'}>Sidia Disdukcapil Kab. Morowali Utara</h6>
    //     <span className={'text-xs mx-auto'}>Versi 1.0</span>
    //   </div>
    //   <div className={'w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg'}>

    //     <Head title="Log in" />

    //     <form onSubmit={submit}>
    //       <div>
    //         <Label forInput="email" value="Email" />

    //         <Input
    //           type="text"
    //           name="email"
    //           value={data.email}
    //           className="mt-1 block w-full"
    //           autoComplete="username"
    //           isFocused={true}
    //           handleChange={(e) => setData('email', e.target.value)}
    //         />
    //       </div>

    //       <div className="mt-4">
    //         <Label forInput="password" value="Password" />

    //         <Input
    //           type="password"
    //           name="password"
    //           value={data.password}
    //           className="mt-1 block w-full"
    //           autoComplete="current-password"
    //           handleChange={(e) => setData('password', e.target.value)}
    //         />
    //       </div>

    //       <div className="block mt-4">
    //         <GoogleReCaptchaProvider
    //           reCaptchaKey={siteKey.props.siteKey}
    //         >
    //           <GoogleReCaptcha onVerify={e => {
    //             if (e !== '') {
    //               if (data.token === '') {
    //                 setData('token', e)
    //               }
    //             }
    //           }} />
    //         </GoogleReCaptchaProvider>
    //       </div>


    //       <div className="flex items-center justify-end mt-4">
    //         <Button className="ml-4" processing={processing}>
    //           Log in
    //         </Button>
    //       </div>
    //       {
    //         Object.keys(siteKey.props.errors).length > 0 && Object.values(siteKey.props.errors).map((e, i) => <ErrorText key={i} message={e} />)
    //       }
    //     </form>
    //   </div>
    // </div>

  );
}
