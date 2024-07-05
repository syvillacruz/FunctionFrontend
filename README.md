# Steps to Run the Project Locally

To get the project up and running on your computer, follow these steps after cloning the GitHub repository:

1. Open a terminal in the project directory and run: `npm i`
2. Open two additional terminals in VS Code.
3. In the second terminal, run: `npx hardhat node`
4. In the third terminal, run: `npx hardhat run --network localhost scripts/deploy.js`
5. Go back to the first terminal and run: `npm run dev` to launch the front-end.

Your project should now be running on your localhost, typically at [http://localhost:3000/](http://localhost:3000/).
