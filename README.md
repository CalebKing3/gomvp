# goMVP

## Setup bolt.diy 

If you're new to installing software from GitHub, don't worry! If you encounter any issues, feel free to submit an "issue" using the provided links or improve this documentation by forking the repository, editing the instructions, and submitting a pull request. The following instruction will help you get the stable branch up and running on your local machine in no time.  

### Prerequisites  

1. **Install Git**: [Download Git](https://git-scm.com/downloads)  
2. **Install Node.js**: [Download Node.js](https://nodejs.org/en/download/)  

   - After installation, the Node.js path is usually added to your system automatically. To verify:  
     - **Windows**: Search for "Edit the system environment variables," click "Environment Variables," and check if `Node.js` is in the `Path` variable.  
     - **Mac/Linux**: Open a terminal and run:  
       ```bash  
       echo $PATH  
       ```  
       Look for `/usr/local/bin` in the output.  

### Clone the Repository  

Clone the repository using Git:  

```bash  
git clone -b stable https://github.com/stackblitz-labs/bolt.diy  
```  

---

## Run the Application  

1. **Install Dependencies**:  
   ```bash  
   pnpm install  
   ```  
   If `pnpm` is not installed, install it using:  
   ```bash  
   sudo npm install -g pnpm  
   ```  

2. **Start the Application**:  
   ```bash  
   pnpm run dev  
   ```
   This will start the Remix Vite development server. You will need Google Chrome Canary to run this locally if you use Chrome! It's an easy install and a good browser for web development anyway.  

---

### Update .env File

All of your API Keys can be configured directly in the application. Just selecte the provider you want from the dropdown and click the pencile icon to enter your API key.

---

### Update Your Local Version to the Latest

To keep your local version of bolt.diy up to date with the latest changes, follow these steps for your operating system:

#### 1. **Navigate to your project folder**  
   Navigate to the directory where you cloned the repository and open a terminal:

#### 2. **Fetch the Latest Changes**  
   Use Git to pull the latest changes from the main repository:

   ```bash
   git pull origin main
   ```

#### 3. **Update Dependencies**  
   After pulling the latest changes, update the project dependencies by running the following command:

   ```bash
   pnpm install
   ```

#### 4. **Run the Application**  
   Once the updates are complete, you can start the application again with:

   ```bash
   pnpm run dev
   ```

This ensures that you're running the latest version of goMVP and can take advantage of all the newest features and bug fixes.

---

## Available Scripts

- **`pnpm run dev`**: Starts the development server.
- **`pnpm run build`**: Builds the project.
- **`pnpm run start`**: Runs the built application locally using Wrangler Pages.
- **`pnpm run preview`**: Builds and runs the production build locally.
- **`pnpm test`**: Runs the test suite using Vitest.
- **`pnpm run typecheck`**: Runs TypeScript type checking.
- **`pnpm run typegen`**: Generates TypeScript types using Wrangler.
- **`pnpm run deploy`**: Deploys the project to Cloudflare Pages.
- **`pnpm run lint:fix`**: Automatically fixes linting issues.

---

## Contributing

We welcome contributions! Check out our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## FAQ

For answers to common questions, issues, and to see a list of recommended models, visit our [FAQ Page](FAQ.md).
