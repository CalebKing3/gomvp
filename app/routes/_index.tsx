import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
// import {Header} from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';

export const meta: MetaFunction = () => {
  return [{ title: 'goMVP' }, { name: 'description', content: 'Talk with Bolt, an AI assistant from StackBlitz' }];
};

export const loader = () => json({});

export default function Index() {
  return (
    <div className="flex flex-row h-full w-full bg-bolt-elements-background-depth-1 font-sfpro">
      <BackgroundRays />
      <Header />
      <div className='w-full h-full'>
      <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
      </div>
    </div>
  );
}
