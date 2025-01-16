import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';
import { manageHeader, toggle } from '~/lib/stores/manageheader';


export function Header() {
  const chat = useStore(chatStore);
  const header = useStore(manageHeader)
  return (
    <header
      className={classNames('absolute top-0 z-60 text-white flex items-center pl-2 py-5 border-b h-[var(--header-height)] backgrop-blur-md', {
        'border-transparent': !chat.started,
        'border-bolt-elements-borderColor w-full': chat.started,
        
      })}
    >
      <div className="flex items-center gap-2 z-logo text-bolt-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl text-white" onClick={()=>toggle()}/>
        <a href="/" className="text-2xl font-semibold text-accent flex items-center">
          {/* <span className="i-bolt:logo-text?mask w-[46px] inline-block" /> */}
          {/* <img src="/gomvplogo.svg" alt="logo" className="w-[90px] inline-block dark:hidden" /> */}
          <img src="/gomvplogo.svg" alt="logo" className="w-[90px] inline-block z-50" />
        </a>
      </div>
      {chat.started && ( // Display ChatDescription and HeaderActionButtons only when the chat has started.
        <>
          <span className="flex-1 px-4 truncate text-center text-bolt-elements-textPrimary">
            <ClientOnly>{() => <ChatDescription />}</ClientOnly>
          </span>
          <ClientOnly>
            {() => (
              <div className="mr-1 z-50">
                <HeaderActionButtons />
              </div>
            )}
          </ClientOnly>
        </>
      )}
    </header>
  );
}
