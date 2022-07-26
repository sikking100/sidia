import React, { useCallback, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/inertia-react';
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import Button from '@/Components/Button'
import route from 'ziggy-js'
import { GoogleReCaptcha, GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { ErrorBag, Errors, Page, PageProps } from '@inertiajs/inertia'
import { ErrorText } from '@/Components/Error'

interface Props extends Page<PageProps> {
  props: {
    siteKey: string
    errors: Errors & ErrorBag
  }

}

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    token: ''
  });

  const siteKey = usePage<Props>()

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);


  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('login'));
  };

  console.log(siteKey)

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
    useEffect(() => {
      handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    return <button onClick={handleReCaptchaVerify}>Verify recaptcha</button>;
  };

  return (



    <div className={'min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-kemenag'}>
      <div className={'w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg'}>

        <Head title="Log in" />

        <form onSubmit={submit}>
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

          <div className="block mt-4">
            <GoogleReCaptchaProvider
              reCaptchaKey={siteKey.props.siteKey}
            >
              <GoogleReCaptcha onVerify={e => {
                if (e !== '') {
                  if (data.token === '') {
                    setData('token', e)
                  }
                }
              }} />
            </GoogleReCaptchaProvider>
          </div>


          <div className="flex items-center justify-end mt-4">
            <Button className="ml-4" processing={processing}>
              Log in
            </Button>
          </div>
          {
            Object.keys(siteKey.props.errors).length > 0 && Object.values(siteKey.props.errors).map((e, i) => <ErrorText key={i} message={e} />)
          }
        </form>
      </div>
    </div>

  );
}
