Recommended products Table Structure

Field Name	Data Type	Description / Example
id	INT / UUID	Primary Key. Unique identifier for the product.
sku	VARCHAR	Stock Keeping Unit. Unique code for inventory (e.g., KB-BRK-WHT-M for Kebaya Brokat White Medium).
name	VARCHAR	The display name of the product (e.g., "Kebaya Brokat Sofia", "Kamen Endek Bali").
description	TEXT	Detailed description of the motif, cultural significance, or fit.
category	ENUM	The main category: kebaya, kamen, selendang (sash), or set (bundled).
price	DECIMAL	The selling price of the item.
stock_quantity	INT	Number of items currently available.
material	VARCHAR	Crucial for traditional wear. Examples: Brokat, Katun, Endek, Songket, Batik, Lace.
color	VARCHAR	Primary color of the item.
size	VARCHAR	Sizes like S, M, L, XL, or All Size (common for Kamen Lembaran).
style_type	VARCHAR	Sub-category style. For Kebaya: Kutu Baru, Kartini, Bali. For Kamen: Lembaran (sheet), Jadi (ready-to-wear).
gender	ENUM	female, male, unisex. (Important because Kamen can be worn by men and women, with different folding styles or ready-to-wear cuts)
main_image_url	VARCHAR	Link to the primary product photo.
status	ENUM	active, draft, archived. To control visibility on the storefront.
created_at	TIMESTAMP	Record creation date.
updated_at	TIMESTAMP	Record last modification date.