BEGIN;

DROP TABLE IF EXISTS users, products, cart;

CREATE TABLE users (
  id serial PRIMARY KEY ,
  username VARCHAR(255) UNIQUE,
   email VARCHAR(255) UNIQUE,
   address VARCHAR(15),
   password VARCHAR(255),
   phonenumber VARCHAR(255)  
);

CREATE TABLE products(
  id  SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  img VARCHAR(255), 
  price VARCHAR(255),
  brand  VARCHAR(255)
  
);

CREATE TABLE cart(
  id SERIAL PRIMARY KEY ,
  -- order_id INTEGER REFERENCES orders(id)
  user_id  INTEGER REFERENCES users(id) ,
  total_price VARCHAR(255) not null,
  products json not null,
  paid boolean default false
 );




INSERT INTO products (name, description, price, img, brand) VALUES
 ('MacBook Pro', '15-inch laptop with a Retina display, 8th generation Intel Core i7 processor, and 16GB of RAM', '1499.99', 'https://i5.walmartimages.com/asr/77158833-c369-444e-a3c1-4641414bed56_1.735c37c779856512761d9cef536dee6d.jpeg','Apple'),
 (' Pro 15in Laptop','15” laptop, 2.3GHz Intel Core i7 16GB Memory, 512GB Solid State Drive , NVIDIA GeForce GT 750M with 2 GB of dedicated GDDR5 memory and an integrated Intel Iris 5200 Pro graphics processor , Connectivity includes 802.11ac Wi-Fi, Bluetooth 4.0, two USB 3.0 ports, two "Thunderbolt 2" ports, an HDMI port, an audio in/out port, and an SDXC card slot','509.00','https://m.media-amazon.com/images/I/31fD+NPpVqL._AC_SX466_.jpg','Apple'),('Pro MF839LL','This product will have a battery that exceeds 80% capacity relative to new,8GB Memory, 128GB SSD Intel Iris Graphics 6100 Connectivity includes 802.11ac Wi-Fi, Bluetooth 4.0, two USB 3.0 ports, two "Thunderbolt 2" ports, an HDMI port, an audio in/out port, and an SDXC card slot.','306.8','https://m.media-amazon.com/images/I/41SdKc-2E+L._AC_SX466_.jpg','Apple'),
('Dell XPS 13', 'Ultra-portable 13-inch laptop with a 1080p touch screen, 10th generation Intel Core i5 processor, and 8GB of RAM', '999.99', 'https://www.manlylaptops.com.au/assets/thumbL/MLLAP98073.jpg?20200909153640','Dell'),
('Lenovo ThinkPad X1 Carbon', '14-inch business laptop with a 1080p display, 11th generation Intel Core i7 processor, and 16GB of RAM', '1399.99', 'https://img.zap.co.il/pics/8/3/9/1/66691938c.gif','Lenovo'),
('HP Spectre x360', '13-inch convertible laptop with a 4K OLED display, 10th generation Intel Core i7 processor, and 16GB of RAM', '1299.99', 'https://www.mall.cz/i/48123977/1000/1000','HP'),
('Asus ROG Zephyrus', 'Gaming laptop with a 15-inch 1080p display, 9th generation Intel Core i7 processor, and 32GB of RAM', '1999.99', 'https://cashcow-cdn.azureedge.net/images/26d42126-c06a-49b7-8b50-ab61d7d51416.jpg','Asus'),
('Acer Aspire 5', 'Budget laptop with a 15-inch 1080p display, 8th generation Intel Core i5 processor, and 8GB of RAM', '499.99', 'https://images.acer.com/is/image/acer/aspire-5-a515-43-sv-01a-1?$Product-Cards-XL$','Acer'),('Spectre x360','It is powered by a Core i7 processor and it comes with 8GB of RAM. The HP Spectre X360 packs 256GB of SSD storage. Graphics are powered by Intel Integrated UHD Graphics 620. Connectivity options include Wi-Fi 802.11 ac, Bluetooth and it comes with 3 USB ports, Mic In ports.','1700.56','https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06958068.png','HP'),
('Pavilion Gaming Laptop','The thin and powerful HP Pavilion Gaming Laptop lets you experience high-grade graphics and processing power that meet your gaming and multitasking needs,Play the latest games in 1080p and up to 144Hz.2','1000','https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06308754.png','HP'),
('Microsoft Surface Laptop', '13-inch laptop with a touchscreen and a 3:2 aspect ratio, 10th generation Intel Core i5 processor, and 8GB of RAM', '999.99', 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4LiWr?ver=4aed','Microsoft'),
('Google Pixelbook Go', 'Chrome OS laptop with a 13-inch 1080p display, 8th generation Intel Core i5 processor, and 8GB of RAM', '799.99', 'https://lh3.googleusercontent.com/cewixHQrBsI-iviE4qPNPLppaYuNTccxIBTi9v2XusjhRvp-UdBpOAYr78exyrJPM5lyFjWHnEQFBSUyJuSSCd3sI-UGN67G8Nbi=s2048','Microsoft'),
('Samsung Notebook 9', 'Ultra-light laptop with a 13-inch 1080p display, 8th generation Intel Core i7 processor, and 16GB of RAM','1299.99', 'https://images.anandtech.com/doci/13721/PR%20NT950SBE_004_R-Perspective_Blue.jpg','Samsung'),(' Samsung Galaxy Book 2 Pro',' 15.6 screen, Core™ i7-1260P processor, 8GB memory, 512SSD disk, approx. Intel Iris Xe screen, weight 1.3, Windows 11 Pro, illuminated keyboard, fingerprint reader, 360 FHD OLED Anti Glare flipping touch screen','8,329.00 ', 'https://www.nayadnayad.co.il/UploadImages/180/641176_360g.jpg','Samsung'),('Asus VivoBook 15 Pro 505-A6','15.6 screen, A6-9220 processor, 8GB memory, 256SSD disk, about Radeon R4 screen, weight 1.6, Windows 10 Pro operating system, Anti Glare IPS screen','3399.99','https://www.nayadnayad.co.il/UploadImages/180/952864_vivored3.jpg','Asus');
COMMIT;