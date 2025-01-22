import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';
import { useAuth } from 'react-oidc-context';

export const meta: MetaFunction = () => {
  return [{ title: 'Bolt' }, { name: 'description', content: 'Talk with Bolt, an AI assistant from StackBlitz' }];
};

export const loader = () => json({});

export default function Index() {
  const auth = useAuth();

 const signOutRedirect = () => {
    const clientId = "55ppf2j5tchab139kvnfo90hrc";
    const logoutUri = "<logout uri>";
    const cognitoDomain = "https://us-west-2oytzzrhl9.auth.us-west-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }


  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
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




