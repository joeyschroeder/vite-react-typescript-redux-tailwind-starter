import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import babelPluginModuleResolver from 'babel-plugin-module-resolver';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            babelPluginModuleResolver,
            {
              alias: {
                components: './src/components',
                store: './src/store',
              },
            },
          ],
          ['babel-plugin-react-compiler'],
        ],
      },
    }),
    tailwindcss(),
  ],
});
