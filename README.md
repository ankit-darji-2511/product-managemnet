# product-managemnet
project of product management


get project from git url : https://github.com/ankit-darji-2511/product-managemnet.git

two folders
frontEnd - react
server - node

to start project

frontEnd
step 1: npm install
step 2: npm run

frontEnd start on port 3000

server (backend)
step 1: npm install
step 2: npm run

server will start on port no 9091


database used : mysql
credentials
username : root
password : ''
port : 3306 (default)
db name : productmanagement_db

CREATE TABLE `product` (
  `Product_ID` int(11) NOT NULL,
  `Product_Name` varchar(20) DEFAULT NULL,
  `Product_Price` decimal(10,0) NOT NULL,
  `Product_Image` text NOT NULL,
  `Product_CreatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




