'use client';
import { Suspense, useContext, useEffect, useState } from 'react';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { NotificationContext, SnackNotificationType } from '@/context/NotificationContext';
import { AppContext } from '@/context/AppContext';
import { DarkOverlay, Svg, CardOverlayContent } from '@/components/elements';
import { Button, ButtonSize, ButtonShape } from '@/components/elements/form';
import SigninOrUpForm from '@/components/user/signinOrUpForm';
import ForgotPasswordForm from '@/components/user/forgotPasswordForm';
import { URL_PARAM_SHOW_SIGNIN_UP } from '@/utils/const';
import { DESIGN, HOME, USER_PLAN, USER_SETTINGS } from '@/utils/routes';
import { SIGN_OUT, signOutProps } from '@/graphql/mutations/accounts';
import { ButtonColor } from './elements/form/button';

function Navbar() {
  const searchParams = useSearchParams();
  const showSignInUpPara = searchParams.get(URL_PARAM_SHOW_SIGNIN_UP) as string;

	const {checkSignedIn, signedIn, user} = useContext(AppContext);
	const {addSnackNotification} = useContext(NotificationContext);

  const [showSignInUp, setShowSignInUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [showSubNav, setShowSubNav] = useState(false);
	const [signOut, {}] = useMutation<signOutProps>(SIGN_OUT, {
    onCompleted: (data) => {
      window.location.href = HOME;
    },
    onError: (error) => {
      addSnackNotification(
        'Error while signing out',
        error.message,
        SnackNotificationType.Error,
        undefined,
        undefined,
        undefined
      )
    }
  });

  useEffect(() => {
    if (showSignInUpPara === 'true') {
      setShowSignInUp(true);
    }
    function handleClickOutside(event: any) {
      if (event.target.id !== 'subNav' && !event.target.closest('#subNav')) {
        setShowSubNav(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return <>
    {(showSignInUp || showForgotPassword) &&
      <DarkOverlay>
        {
          showSignInUp &&
          <div className='max-w-screen-md w-full p-8'>
            <CardOverlayContent 
              title={'Sign up or sign in'}
              close={() => {
                setShowSignInUp(false);
                setShowForgotPassword(false);
              }}>
              <SigninOrUpForm close={() => {
                  setShowSignInUp(false);
                  setShowForgotPassword(false);
                }}
                switchToForgotPassword={() => {
                  setShowSignInUp(false);
                  setShowForgotPassword(true);
                }}/>
            </CardOverlayContent>
	        </div>
        }
        { showForgotPassword &&
        <div className='max-w-screen-md w-full p-8'>
          <CardOverlayContent 
            title='Forgot password'
            close={() => {
              setShowSignInUp(false);
              setShowForgotPassword(false);
            }}>
            <ForgotPasswordForm close={() => {
                  setShowSignInUp(false);
                  setShowForgotPassword(false);
                }}
              switchToSignIn={() => {
                setShowSignInUp(true);
                setShowForgotPassword(false);
              }}/>
            </CardOverlayContent>
          </div>
        }
      </DarkOverlay>
    }
    <div className='max-w-[1440px] mx-auto'>
      <div className='flex justify-end py-4 px-8'>
        { signedIn ?
          <div id='subNav' className='relative flex items-center cursor-pointer transition-colors z-20'>
            <Button onClick={() => {setShowSubNav(!showSubNav);}}
                buttonColor={ButtonColor.Black}
                buttonSize={ButtonSize.Medium}
                buttonShape={ButtonShape.Round}
                className='parent-hover whitespace-nowrap shadow-lg text-sm'>
              Account
              <Svg src='/fontawesome/svgs/light/user.svg'
                className='flex flex-row w-4 h-5 self-center
                    bg-white ml-2'/>
            </Button>
            { showSubNav &&
              <div
                className='absolute w-36 top-full right-0 flex flex-col shadow-lg rounded-lg animate-scale
                bg-white
                  mt-1'>
                <Link href={DESIGN} onClick={(e) => {e.stopPropagation(); setShowSubNav(false);}}
                  className='rounded-t-lg transition-colors
                      bg-white hover:bg-gray-400
                      px-4'>
                  <div className='flex break-keep border-b border-gray-400 py-4'>
                    <Svg src='/fontawesome/svgs/light/swatchbook.svg'
                      className='flex flex-row w-4 h-4 self-center
                          bg-gray-600
                          ml-1 mr-2'/>
                      Designs
                  </div>
                </Link>
                <Link href={USER_PLAN} onClick={(e) => {e.stopPropagation(); setShowSubNav(false);}}
                  className='transition-colors
                    bg-white hover:bg-gray-400
                    px-4'>
                  <div className='flex break-keep border-b border-gray-400 py-4'>
                    <Svg src='/fontawesome/svgs/light/calendar.svg'
                      className='flex flex-row w-4 h-5 self-center
                          bg-gray-600
                          mr-2'/>
                    My plan
                  </div>
                </Link>
                <Link href={USER_SETTINGS} onClick={(e) => {e.stopPropagation(); setShowSubNav(false);}}
                  className='transition-colors
                    bg-white hover:bg-gray-400
                    px-4'>
                  <div className='flex break-keep border-b border-gray-400 py-4'>
                    <Svg src='/fontawesome/svgs/light/cog.svg'
                      className='flex flex-row w-4 h-4 self-center
                          bg-gray-600
                          mr-2'/>
                    Settings
                  </div>
                </Link>
                <div className='rounded-b-lg transition-colors
                    bg-white hover:bg-gray-400
                    px-4'
                    onClick={(e) => {signOut(); e.stopPropagation(); setShowSubNav(false);}}>
                  <div className='flex break-keep border-gray-400 py-4'>
                    <Svg src='/fontawesome/svgs/light/sign-out.svg'
                      className='flex flex-row w-4 h-4 self-center
                        bg-gray-600
                          mr-2'/>
                    Sign out
                  </div>
                </div>
              </div>
            }
          </div>
          :
          <div className='flex items-center'>
            <Button onClick={() => {setShowSignInUp(true);}}
                buttonColor={ButtonColor.Black}
                buttonSize={ButtonSize.Small}
                buttonShape={ButtonShape.Round}
                className='parent-hover whitespace-nowrap shadow-lg'>
              Sign in
              <span className='ml-1.5 pb-0.5'>
                <span>
                  <span className='small-hover-arrow-right-extension-line ml-2'/>
                </span>
                <span className='small-hover-arrow-right-extension-tip-container'>
                  <span className='small-hover-arrow-right-extension-tip'/>
                </span>
              </span>
            </Button>
          </div>
        }
      </div>
    </div>
  </>;
}

export default function NavbarWrapper() {
  return <Suspense>
    <Navbar/>
  </Suspense>
}