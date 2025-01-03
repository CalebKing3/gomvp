import type { ProviderInfo } from '~/types/model';
import type { ModelInfo } from '~/utils/types';
import { useEffect, useState } from 'react';

interface ModelSelectorProps {
  model?: string;
  setModel?: (model: string) => void;
  provider?: ProviderInfo;
  setProvider?: (provider: ProviderInfo) => void;
  modelList: ModelInfo[];
  providerList: ProviderInfo[];
  apiKeys: Record<string, string>;
}

export const ModelSelector = ({
  model,
  setModel,
  provider,
  setProvider,
  modelList,
  providerList,
}: ModelSelectorProps) => {
  // Load enabled providers from cookies

  const [aiModel, setaiModel] = useState('Anthropy');
  // Update enabled providers when cookies change
  useEffect(() => {
    // If current provider is disabled, switch to first enabled provider
    if (providerList.length == 0) {
      return;
    }

    if (provider && !providerList.map((p) => p.name).includes(provider.name)) {
      const firstEnabledProvider = providerList[0];
      setProvider?.(firstEnabledProvider);

      // Also update the model to the first available one for the new provider
      const firstModel = modelList.find((m) => m.provider === firstEnabledProvider.name);

      if (firstModel) {
        setModel?.(firstModel.name);
      }
    }
  }, [providerList, provider, setProvider, modelList, setModel]);

  if (providerList.length === 0) {
    return (
      <div className="mb-2 p-4 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-prompt-background text-bolt-elements-textPrimary">
        <p className="text-center">
          No providers are currently enabled. Please enable at least one provider in the settings to start using the
          chat.
        </p>
      </div>
    );
  }


  return (
    <div className="mb-2 flex gap-2 flex-row justify-evenly items-center">

      <div className={`rounded-lg text-center cursor-pointer py-2 px-4 ${aiModel === 'Anthropy' ? 'text-yellow bg-yellow-600' : 'bg-gray-600 text-lightgray-500'}`} onClick={()=>setaiModel('Anthropy')}>Anthropy</div>
      <div className={`i-ph:arrows-left-right-thin text-white text-2xl duration-100 ${aiModel === 'Anthropy' ? 'rotate-180' : 'rotate-0'}`} />
      <div className={`rounded-lg text-center cursor-pointer py-2 px-6 ${aiModel === 'Ollama' ? 'text-yellow bg-yellow-600 py-2 px-10' : 'bg-gray-600 text-lightgray-500'}`} onClick={()=>setaiModel('Ollama')}>Ollama</div>

      {/* <select
        value={provider?.name ?? ''}
        onChange={(e) => {
          const newProvider = providerList.find((p: ProviderInfo) => p.name === e.target.value);

          if (newProvider && setProvider) {
            setProvider(newProvider);
          }

          const firstModel = [...modelList].find((m) => m.provider === e.target.value);

          if (firstModel && setModel) {
            setModel(firstModel.name);
          }
        }}
        className="flex-1 p-2 rounded-lg border border-bolt-elements-borderColor bg-darkgray-500 text-gray-400 focus:outline-none  transition-all"
      >
        {providerList.map((provider: ProviderInfo) => (
          <option key={provider.name} value={provider.name}>
            {provider.name}
          </option>
        ))}
      </select> */}


      {/* <select
        key={provider?.name}
        value={model}
        onChange={(e) => setModel?.(e.target.value)}
        className="flex-1 p-2 rounded-lg border border-bolt-elements-borderColor bg-darkgray-500 text-gray-400 focus:outline-none focus:ring-2 focus:ring-bolt-elements-focus transition-all lg:max-w-[70%]"
      >
        {[...modelList]
          .filter((e) => e.provider == provider?.name && e.name)
          .map((modelOption, index) => (
            <option key={index} value={modelOption.name}>
              {modelOption.label}
            </option>
          ))}
      </select> */}
    </div>
  );
};
