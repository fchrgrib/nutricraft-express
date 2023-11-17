# Nutricraft Express

## Overview
nutricraft express merupakan sebuah API yang digunakan pada Nutricraft SOAP dan Nutricraft SPA, API ini sangat berguna dalam keberjalannya kedua service tersebut seperti melakukan request data data yang dibutuhkan, mengubah data, menghapus, ataupun mengupdate.

## Skema Basis Data
![](storage\screenshoot\basisdata.jpg)

## Endpoint

### Unprotected
1. `POST` /login
2. `POST` /register
3. `DELETE` /logout
4. `GET` /image
5. `GET` /image/:id
6. `GET` /image/profile/:uuid
7. `POST` /image
8. `PUT` /image/:id
9. `DELETE` /image/:id

### Protected
1. `GET` /content
2. `GET` /content/:id
3. `GET` /content/creator/:uuid
4. `GET` /content/creator
5. `POST` /content/title
6. `POST` /content/title/subscriber
7. `POST` /content/subscriber
8. `POST` /content
9. `DELETE` /content/:id
10. `PUT` /content/:id
11. `POST` /comment
12. `PUT` /comment/:id
13. `DELETE` /comment/:id
14. `POST` /like
15. `DELETE` /like/:id
16. `GET` /forum
17. `POST` /forum
18. `DELETE` /forum/:id
19. `PUT` /forum/:id
20. `GET` /forum/:id
21. `POST` /redeem
22. `PUT` /redeem
23. `DELETE` /redeem/:id
24. `GET` /redeem
25. `POST` /redeem/user
26. `GET` /user
27. `GET` /user/:id
28. `POST` /user
29. `PUT` /user/:id
30. `DELETE` /user/:id
31. `GET` /coin/:uuid
32. `GET` /exp/:uuid


# Pembagian Tugas

| Fungsi Backend | NIM                |
|----------------|--------------------|
| Login          | 13521031           |
| Logout         | 13521031           |
| Register       | 13521031           |
| Content        | 13521031, 13521011 |
| File           | 13521031           |
| Comment        | 13521031           |
| Forum          | 13521031           |
| Like           | 13521031           |
| Redeem         | 13521031           |
| User           | 13521031           |
| Coin SOAP      | 13521031           |
| Subscribe SOAP | 13521031           |
| Level SOAP     | 13521031           |
| Middleware     | 13521031           |
| UserAccess     | 13521031           |
| RedeemAccess   | 13521031           |
| Router         | 13521031           |
| Docker         | 13521031           |
