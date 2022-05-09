import logo from '../public/missmp-logo.png'
import { SelfServiceLoginFlow } from '@ory/kratos-client'
import { CardTitle } from '@ory/themes'
import { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { ActionCard, CenterLink, createLogoutHandler, MarginCard } from '../pkg'

const Logout: NextPage = () => {
  const [flow, setFlow] = useState<SelfServiceLoginFlow>()

  // Get ?flow=... from the URL
  const router = useRouter()
  const {
    return_to: returnTo,
    flow: flowId,
    // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
    // of a user.
    refresh,
    // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
    // to perform two-factor authentication/verification.
    aal
  } = router.query

  // This might be confusing, but we want to show the user an option
  // to sign out if they are performing two-factor authentication!
  const onLogout = createLogoutHandler([aal, refresh])

  //   useEffect(() => {
  //     // If the router is not ready yet, or we already have a flow, do nothing.
  //     if (!router.isReady || flow) {
  //       return
  //     }

  //     // If ?flow=.. was in the URL, we fetch it
  //     if (flowId) {
  //       ory
  //         .getSelfServiceLoginFlow(String(flowId))
  //         .then(({ data }) => {
  //           setFlow(data)
  //         })
  //         .catch(handleGetFlowError(router, 'login', setFlow))
  //       return
  //     }

  //     // Otherwise we initialize it
  //     ory
  //       .initializeSelfServiceLoginFlowForBrowsers(
  //         Boolean(refresh),
  //         aal ? String(aal) : undefined,
  //         returnTo ? String(returnTo) : undefined
  //       )
  //       .then(({ data }) => {
  //         setFlow(data)
  //       })
  //       .catch(handleFlowError(router, 'login', setFlow))
  //   }, [flowId, router, router.isReady, aal, refresh, returnTo, flow])

  //   const onSubmit = (values: SubmitSelfServiceLoginFlowBody) =>
  //     router
  //       // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
  //       // his data when she/he reloads the page.
  //       .push(`/login?flow=${flow?.id}`, undefined, { shallow: true })
  //       .then(() =>
  //         ory
  //           .submitSelfServiceLoginFlow(String(flow?.id), undefined, values)
  //           // We logged in successfully! Let's bring the user home.
  //           .then((res) => {
  //             if (flow?.return_to) {
  //               window.location.href = flow?.return_to
  //               return
  //             }

  //             if (process.env.NEXT_PUBLIC_AFTER_LOGGED_IN_URL) {
  //               window.location.href = process.env.NEXT_PUBLIC_AFTER_LOGGED_IN_URL
  //               return
  //             } else {
  //               router.push('/')
  //             }
  //           })
  //           .then(() => {})
  //           .catch(handleFlowError(router, 'login', setFlow))
  //           .catch((err: AxiosError) => {
  //             // If the previous handler did not catch the error it's most likely a form validation error
  //             if (err.response?.status === 400) {
  //               // Yup, it is!
  //               setFlow(err.response?.data)
  //               return
  //             }

  //             return Promise.reject(err)
  //           })
  //       )

  return (
    <>
      <Head>
        <title>Sign out</title>
        <meta name="description" content="" />
      </Head>
      <MarginCard>
        <CardTitle>
          <div>
            <Image alt="missmp" src={logo} width={80} height={80} />
          </div>
          {/* <p>
            {(() => {
              if (flow?.refresh) {
                return 'Confirm Action'
              } else if (flow?.requested_aal === 'aal2') {
                return 'Two-Factor Authentication'
              }
              return 'Sign In'
            })()}
          </p> */}
        </CardTitle>
        {/* <Flow onSubmit={onSubmit} flow={flow} /> */}
      </MarginCard>

      <ActionCard>
        <CenterLink data-testid="logout-link" onClick={onLogout}>
          Log out
        </CenterLink>
      </ActionCard>
    </>
  )
}

export default Logout
