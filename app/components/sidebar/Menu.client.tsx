import { motion, type Variants } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogButton, DialogDescription, DialogRoot, DialogTitle } from '~/components/ui/Dialog';
import { ThemeSwitch } from '~/components/ui/ThemeSwitch';
import { SettingsWindow } from '~/components/settings/SettingsWindow';
import { SettingsButton } from '~/components/ui/SettingsButton';
import { db, deleteById, getAll, chatId, type ChatHistoryItem, useChatHistory } from '~/lib/persistence';
import { cubicEasingFn } from '~/utils/easings';
import { logger } from '~/utils/logger';
import { HistoryItem } from './HistoryItem';
import { binDates } from './date-binning';
import { useSearchFilter } from '~/lib/hooks/useSearchFilter';
import { Header } from '../header/Header';
import { useStore } from '@nanostores/react';
import { workbenchStore, type WorkbenchViewType } from '~/lib/stores/workbench';

const menuVariants = {
  closed: {
    opacity: 0,
    visibility: 'hidden',
    left: '-150px',
    transition: {
      duration: 0.2,
      ease: cubicEasingFn,
    },
  },
  open: {
    opacity: 1,
    visibility: 'initial',
    left: 0,
    transition: {
      duration: 0.2,
      ease: cubicEasingFn,
    },
  },
} satisfies Variants;

type DialogContent = { type: 'delete'; item: ChatHistoryItem } | null;

function CurrentDateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 px-4 py-3 font-bold text-gray-700 dark:text-gray-300 border-b border-bolt-elements-borderColor">
      <div className="h-4 w-4 i-ph:clock-thin" />
      {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
}

export const Menu = () => {
  const { duplicateCurrentChat, exportChat } = useChatHistory();
  const menuRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<ChatHistoryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContent>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { filteredItems: filteredList, handleSearchChange } = useSearchFilter({
    items: list,
    searchFields: ['description'],
  });


  const showWorkbench = useStore(workbenchStore.showWorkbench);


  const loadEntries = useCallback(() => {
    if (db) {
      getAll(db)
        .then((list) => list.filter((item) => item.urlId && item.description))
        .then(setList)
        .catch((error) => toast.error(error.message));
    }
  }, []);

  const deleteItem = useCallback((event: React.UIEvent, item: ChatHistoryItem) => {
    event.preventDefault();

    if (db) {
      deleteById(db, item.id)
        .then(() => {
          loadEntries();

          if (chatId.get() === item.id) {
            // hard page navigation to clear the stores
            window.location.pathname = '/';
          }
        })
        .catch((error) => {
          toast.error('Failed to delete conversation');
          logger.error(error);
        });
    }
  }, []);

  const closeDialog = () => {
    setDialogContent(null);
  };

  useEffect(() => {
    if (open) {
      loadEntries();
    }
  }, [open]);

  useEffect(() => {
    const enterThreshold = 40;
    const exitThreshold = 40;

    function onMouseMove(event: MouseEvent) {
      if (event.pageX < enterThreshold) {
        setOpen(true);
      }

      if (menuRef.current && event.clientX > menuRef.current.getBoundingClientRect().right + exitThreshold) {
        setOpen(false);
      }
    }

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleDeleteClick = (event: React.UIEvent, item: ChatHistoryItem) => {
    event.preventDefault();
    setDialogContent({ type: 'delete', item });
  };

  const handleDuplicate = async (id: string) => {
    await duplicateCurrentChat(id);
    loadEntries(); // Reload the list after duplication
  };

  const handlebaropening = () => {
    if (((window as Window).innerWidth < 500) && open) {
      return 'closed'
    }
    else if (((window as Window).innerWidth < 500) && !open) {
      return 'open'
    }
    else if(((window as Window).innerWidth > 500)){
      if (!showWorkbench && open) {
        return 'open'
      }
      else if (showWorkbench && !open) {
        return 'closed'
      }
      else if (showWorkbench && open) {
        return 'open'
      }
      return 'open'
    }
  }
  const sidebar_array = [
    {
      name: 'Projects',
      route: '//',
      icon: 'i-ph:file-bold',
    },
    {
      name: 'Templates',
      route: '//',
      icon: 'i-ph:codesandbox-logo-duotone',
    },
    {
      name: 'Documents',
      route: '//',
      icon: 'i-ph:files-fill',
      action: 'add',
    },
    {
      name: 'Community',
      route: '//',
      icon: 'i-ph:person-simple-circle-light',
      badge: 'NEW',
    },
    {
      name: 'History',
      route: '//',
      icon: 'i-ph:arrows-counter-clockwise-bold',
    },
    {
      name: 'History',
      route: '//',
      icon: 'i-ph:arrows-counter-clockwise-bold',
    },
    {
      name: 'Settings',
      route: '//',
      icon: 'i-ph:gear-bold',
    },
    {
      name: 'Help',
      route: '//',
      icon: 'i-ph:question-bold',
    }
  ];

  const handleMenu = () => {
    setOpen(!open)
  }

  return (
    <>
    <motion.div
      ref={menuRef}
      initial="open"
      animate={handlebaropening()}
      variants={menuVariants}
      className="flex selection-accent p-1.5 fixed z-40 !h-[100vh] flex-col side-menu w-full max-w-[300px] h-full bg-black border-r-[1px] border-r-yellow shadow-xl shadow-bolt-elements-sidebar-dropdownShadow text-sm"
    >

      <div className="h-[40px] " /> {/* Spacer for top margin */}
      <CurrentDateTime />
      <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
        <div className="p-4 select-none">
          <a
            href="/"
            className="flex gap-2 items-center bg-yellow-600 text-yellow font-medium hover:bg-yellow-700 rounded-md p-3 transition-theme mb-4"
          >
            <span className="inline-block i-bolt:chat scale-110" />
            Start new chat
          </a>
          <div className="relative w-full">
            <input
              className="w-full bg-darkgray-500 dark:bg-bolt-elements-background-depth-4 relative px-2 py-2 rounded-md  placeholder-bolt-elements-textTertiary text-gray-400 dark:text-bolt-elements-textPrimary border border-bolt-elements-borderColor"
              type="search"
              placeholder="Search"
              onChange={handleSearchChange}
              aria-label="Search chats"
            />
          </div>
        </div>
        {/* <div className="font-bold text-[2rem] pl-6 pr-5 mt-2 mb-4 text-[#424242]">Your Chats</div>
        <div className="flex-1 overflow-auto pl-4 pr-5 pb-5">
          {filteredList.length === 0 && (
            <div className="pl-2 text-bolt-elements-textTertiary">
              {list.length === 0 ? 'No previous conversations' : 'No matches found'}
            </div>
          )}
          <DialogRoot open={dialogContent !== null}>
            {binDates(filteredList).map(({ category, items }) => (
              <div key={category} className="mt-4 first:mt-0 space-y-1">
                <div className="text-bolt-elements-textTertiary sticky top-0 z-1 bg-bolt-elements-background-depth-2 pl-2 pt-2 pb-1">
                  {category}
                </div>
                {items.map((item) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    exportChat={exportChat}
                    onDelete={(event) => handleDeleteClick(event, item)}
                    onDuplicate={() => handleDuplicate(item.id)}
                  />
                ))}
              </div>
            ))}
            <Dialog onBackdrop={closeDialog} onClose={closeDialog}>
              {dialogContent?.type === 'delete' && (
                <>
                  <DialogTitle>Delete Chat?</DialogTitle>
                  <DialogDescription asChild>
                    <div>
                      <p>
                        You are about to delete <strong>{dialogContent.item.description}</strong>.
                      </p>
                      <p className="mt-1">Are you sure you want to delete this chat?</p>
                    </div>
                  </DialogDescription>
                  <div className="px-5 pb-4 bg-bolt-elements-background-depth-2 flex gap-2 justify-end">
                    <DialogButton type="secondary" onClick={closeDialog}>
                      Cancel
                    </DialogButton>
                    <DialogButton
                      type="danger"
                      onClick={(event) => {
                        deleteItem(event, dialogContent.item);
                        closeDialog();
                      }}
                    >
                      Delete
                    </DialogButton>
                  </div>
                </>
              )}
            </Dialog>
          </DialogRoot>
        </div> */}
        <div className='overflow-y-auto flex flex-col gap-3'>
          {sidebar_array.map((items, i) => (
            <div key={i} className="flex items-center gap-6 py-2 px-4 text-white hover:text-yellow hover:cursor-pointer">
              <div className={`${items.icon} w-6 h-6`} />
              <span className='text-md 2xl:text-xl font-normal ml-2'>{items.name}</span>
              {items.badge && (
                <span className="bg-blue-500 text-sm  rounded ml-2">
                  {items.badge}
                </span>
              )}
            </div>
          ))}
        </div>
        <div>
          <div className='p-10' />
          <div className="flex items-center gap-6 border-t border-bolt-elements-borderColor p-4 absolute bottom-0">
            {/* <SettingsButton onClick={() => setIsSettingsOpen(true)} /> */}
            {/* <ThemeSwitch /> */}
            <div className='i-ph:user-circle-fill w-10 h-10 text-white' />
            <div className='text-white'>
              <div className='font-semibold text-lg'>Test_User</div>
              <div className='text-darkgray-500'>testuser@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
      <SettingsWindow open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </motion.div>
    </>
  );
};
