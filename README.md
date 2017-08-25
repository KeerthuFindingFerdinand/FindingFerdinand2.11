## FF SOCIETY (CUSTOMER LOYALTY PROGRAM)

### DATA MANAGEMENT
#### Shopify:
Shopify manage customer, order, product details.

* Customer - Customer id, Name, Address, Phone, Email
* Order - Order id, Customer Name, Product details, Quantity, Order date, Order Price, shipping address
* Product - Product id, Name, Product description, vendor, Product price, product image

#### Customer Field App:
Customer field app is third party app of shopify. Which helps to store additional details about customer.

*   Customer's additional information- Eye color, Skin tone, Hair Color, Beauty Favorite

#### Firebase:
Firebase Stores Customer's profile / avatar image and FF Society Promotion manager data.

* Customer Profile
* FF Society Promotion Manager- Promotion name, Start date, End Date, Active/ Inactive, Promotion images, Promotion title and body text.

In Firebase all images are stored in Storage.
And all other text information are stored in database.

#### Swell API

Swell API manage Customer scores and Coupon related details.

* Score- Customer email, Score earned, Score Balance, total purchase,total spent, membership from, etc.
* Coupon- Coupon id, redeem points, percentage
##### Customer and Score related url

https://www.swellrewards.com/api/v2/customers?customer_email={{customer.email}}&merchant_id=17000&api_key=u9N91hrRyZSrrrI0S5wQrgtt

##### Coupon and redeem related url
https://www.swellrewards.com/api/v2/redemption_options?merchant_id=17000&api_key=u9N91hrRyZSrrrI0S5wQrgtt

And also manage lot more information about redemption, points, sharing them. For more information
http://dev.swellrewards.com/

<img height="700" src="https://mail.google.com/mail/u/0/?ui=2&ik=9bfc0699b2&view=att&th=15dd34da70baaead&attid=0.1&disp=safe&realattid=f_j68ey2631&zw"/>
