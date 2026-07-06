FullStack React პროექტი, გამართული backend-ით და Frontend-ით. სრულად გასტილულია Scss-ის საშუალებით, გამოყენებულია React-Slick კარუსელები. 
პროექტის ბაზა მდებარეობს MongoDB-ში, ასევე გამართულია რეგისტრაცია/შესვლის ლოგიკა Jason-Web-Token-ით. გამოყოფილია მომხმარებლების ბაზა, სადაც დაცულია მათი პაროლები bcrypt-ის საშუალებით.
პროექტში გამოყენებულია Cache-პრინციპი დროის ეფექტურად გამოყენებისთვის. ასევე გამოყენებულია AppScale ტექნიკა და Mobile Responsive.
საიტს აქვს როგორც ინგლისური და ქართული ენის მხარდაჭერა, ასევე დოლარის და ლარის მხარდაჭერა.
სატესტო იუზერების ინფორმაცია:
User: globjanidze78@gmail.com , Pass: Giorgi0712
User: saba@gmail.com , Pass: Saba123

.env ინფორმაცია:
CONNECTION_STRING = mongodb+srv://giorgi:giorgi0712@cluster0.gzgnuhp.mongodb.net/beerDB
JWT_SECRET_KEY=...
JWT_RESET_PASS_SECRET_KEY=...
BCRYPT_PEPPER=...
MAIL_SENDER_EMAIL=brewbliss.provider@gmail.com
MAIL_SENDER_PASS=zupd bjxh xaaf wean
გამოტოვებული ადგილების ნაცვლად ჩაწერეთ თქვენთვის სასურველი კოდები.

პროექტის ლოკალურად გასაშვებად, დაგჭირდებათ node-modules-ების გადმოწერა, .env-ის დაყენება, და შემდეგ ჯერ backend-ის გაშვება npm run dev - ის საშუალებით, 
ხოლო შემდგომ frontend-ის ასევე npm run dev -ით.
