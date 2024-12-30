import React, { useState } from 'react';
import { IconButton } from '~/components/ui/IconButton';
import type { ProviderInfo } from '~/types/model';
import styles from './BaseChat.module.scss';
import { classNames } from '~/utils/classNames';

interface APIKeyManagerProps {
  provider: ProviderInfo;
  apiKey: string;
  setApiKey: (key: string) => void;
  getApiKeyLink?: string;
  labelForGetApiKey?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const APIKeyManager: React.FC<APIKeyManagerProps> = ({ provider, apiKey, setApiKey }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(tempKey);
    setIsEditing(false);
  };

  return (
    <div className="flex items-start sm:items-center mt-2 mb-2 flex-col sm:flex-row">
      <div className='flex flex-row gap-4 items-center'>
        <span className="text-sm text-bolt-elements-button-primary-background text-gray-500 font-semibold">{provider?.name} API Key :</span>
        {!isEditing && (
          <div className="flex items-center ">
            <span className="flex-1 text-xs text-bolt-elements-textPrimary mr-2 text-gray-700">
              {apiKey ? '••••••••' : 'Not set (will still work if set in .env file)'}
            </span>
            <IconButton onClick={() => setIsEditing(true)} title="Edit API Key">
              <div className="i-ph:pencil-simple text-white" />
            </IconButton>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="flex items-center gap-3 mt-2">
          <input
            type="password"
            value={tempKey}
            placeholder="Your API Key"
            onChange={(e) => setTempKey(e.target.value)}
            className={classNames(styles.bgboltelementsinputtext, 'flex-1 px-2 py-1 ml-4 text-xs lg:text-sm rounded border border-bolt-elements-borderColor text-white focus:outline-none focus:ring-2 focus:ring-bolt-elements-focus')}
          />
          <IconButton onClick={handleSave} title="Save API Key">
            <div className="i-ph:check text-white" />
          </IconButton>
          <IconButton onClick={() => setIsEditing(false)} title="Cancel">
            <div className="i-ph:x text-white" />
          </IconButton>
        </div>
      ) : (
        <>
          {provider?.getApiKeyLink && (
            <IconButton className="ml-auto bg-gray-700" onClick={() => window.open(provider?.getApiKeyLink)} title="Edit API Key">
              <span className="mr-2 text-xs lg:text-sm text-gray-500 underline">{provider?.labelForGetApiKey || 'Get API Key'}</span>
              <div className={provider?.icon || 'i-ph:key text-gray-400'} />
            </IconButton>
          )}
        </>
      )}
    </div>
  );
};
