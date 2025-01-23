import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';
import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [{ title: 'Bolt' }, { name: 'description', content: 'Talk with Bolt, an AI assistant from StackBlitz' }];
};

export const loader = () => json({});

export default function Index() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
    <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
    </div>
    );
  }

  useEffect(()=>{
    if(!auth.isAuthenticated){
    auth.signinRedirect()
    }
  },[auth])

}



// import { json, type MetaFunction } from '@remix-run/cloudflare';
// import { ClientOnly } from 'remix-utils/client-only';
// import { BaseChat } from '~/components/chat/BaseChat';
// import { Chat } from '~/components/chat/Chat.client';
// import { Header } from '~/components/header/Header';
// import BackgroundRays from '~/components/ui/BackgroundRays';

// export const meta: MetaFunction = () => {
//   return [{ title: 'Bolt' }, { name: 'description', content: 'Talk with Bolt, an AI assistant from StackBlitz' }];
// };

// export const loader = () => json({});

// export default function Index() {
//   return (
//     <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
//       <BackgroundRays />
//       <Header />
//       <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
//     </div>
//   );
// }




