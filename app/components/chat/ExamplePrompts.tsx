import React from 'react';

const EXAMPLE_PROMPTS = [
  { text: 'Build a todo app in React using Tailwind' },
  { text: 'Build a simple blog using Astro' },
  { text: 'Create a cookie consent form using Material UI' },
  { text: 'Make a space invaders game' },
  { text: 'Make a Tic Tac Toe game in html, css and js only' },
];

export function ExamplePrompts(sendMessage?: { (event: React.UIEvent, messageInput?: string): void | undefined }) {
  return (
    <div id="example" className="relative flex flex-col justify-center gap-9 mx-auto mt-6">
      <div
        className="flex flex-col justify-center gap-6"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards',
        }}
      >
        {EXAMPLE_PROMPTS.map((examplePrompt, index: number) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                sendMessage?.(event, examplePrompt.text);
              }}
              className="border-[1px] border-yellow z-30 rounded-full bg-darkgray-500 hover:bg-gray-100 dark:bg-gray-950 text-gray-400 hover:text-darkgray px-3 py-3 text-xs transition-theme "
            >
              {examplePrompt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
