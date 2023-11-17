# Nutricraft Express

## Overview
nutricraft express merupakan sebuah API yang digunakan pada Nutricraft SOAP dan Nutricraft SPA, API ini sangat berguna dalam keberjalannya kedua service tersebut seperti melakukan request data data yang dibutuhkan, mengubah data, menghapus, ataupun mengupdate.

## Project Structure
```
.
├── Dockerfile
├── README.md
├── controller
│   ├── auth
│   │   ├── login.ts
│   │   ├── logout.ts
│   │   └── register.ts
│   ├── content
│   │   └── content.ts
│   ├── file
│   │   └── file.ts
│   ├── forum
│   │   ├── comment.forum.ts
│   │   ├── forum.ts
│   │   └── like.forum.ts
│   ├── redeem
│   │   └── redeem.ts
│   └── user
│       └── user.ts
├── dist
│   ├── conf
│   │   └── redis.conf.js
│   ├── controller
│   │   ├── auth
│   │   │   ├── login.js
│   │   │   ├── logout.js
│   │   │   └── register.js
│   │   ├── content
│   │   │   └── content.js
│   │   ├── file
│   │   │   └── file.js
│   │   ├── forum
│   │   │   ├── comment.forum.js
│   │   │   ├── forum.js
│   │   │   └── like.forum.js
│   │   ├── profile
│   │   │   └── profile.js
│   │   ├── redeem
│   │   │   └── redeem.js
│   │   ├── reedem
│   │   │   └── reedem.js
│   │   └── user
│   │       └── user.js
│   ├── handler
│   │   ├── conf
│   │   │   └── redis.conf.js
│   │   ├── jwt
│   │   │   └── jwt.handler.js
│   │   └── middleware
│   │       ├── middleware.js
│   │       ├── multer.js
│   │       ├── redeem.access.js
│   │       └── user.access.js
│   ├── index.js
│   ├── router
│   │   ├── auth
│   │   │   └── auth.router.js
│   │   ├── content
│   │   │   └── content.router.js
│   │   ├── file
│   │   │   └── file.router.js
│   │   ├── forum
│   │   │   ├── comment.forum.router.js
│   │   │   ├── forum.router.js
│   │   │   └── like.forum.router.js
│   │   ├── redeem
│   │   │   └── redeem.router.js
│   │   ├── router.js
│   │   ├── soap
│   │   │   └── soap.service.router.js
│   │   └── user
│   │       └── user.router.js
│   ├── soap
│   │   ├── model
│   │   │   └── model.soap.js
│   │   ├── service
│   │   │   ├── coin.soap.service.js
│   │   │   ├── level.soap.service.js
│   │   │   └── subscribe.soap.service.js
│   │   └── template
│   │       ├── coin.soap.template.js
│   │       ├── level.soap.template.js
│   │       └── subscribe.soap.template.js
│   └── utils
│       ├── auth.utils.js
│       ├── jwt.utils.js
│       └── user.utils.js
├── handler
│   ├── conf
│   │   └── redis.conf.ts
│   └── middleware
│       ├── middleware.ts
│       ├── multer.ts
│       ├── redeem.access.ts
│       └── user.access.ts
├── index.ts
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20231113222829_v1
│   │   │   └── migration.sql
│   │   ├── 20231115193940_v2
│   │   │   └── migration.sql
│   │   ├── 20231115210631_
│   │   │   └── migration.sql
│   │   ├── 20231116023145_
│   │   │   └── migration.sql
│   │   ├── 20231116160040_v3
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── router
│   ├── auth
│   │   └── auth.router.ts
│   ├── content
│   │   └── content.router.ts
│   ├── file
│   │   └── file.router.ts
│   ├── forum
│   │   ├── comment.forum.router.ts
│   │   ├── forum.router.ts
│   │   └── like.forum.router.ts
│   ├── redeem
│   │   └── redeem.router.ts
│   ├── router.ts
│   └── user
│       └── user.router.ts
├── soap
│   ├── model
│   │   └── model.soap.ts
│   ├── service
│   │   ├── coin.soap.service.ts
│   │   ├── level.soap.service.ts
│   │   └── subscribe.soap.service.ts
│   └── template
│       ├── coin.soap.template.ts
│       ├── level.soap.template.ts
│       └── subscribe.soap.template.ts
├── storage
│   ├── assets
│   │   ├── 0cda3eab-e9b0-404a-a6a1-add5b47f7abf.png
│   │   ├── 14d921ce-7eb1-45ca-a662-13368d259e57.jpeg
│   │   ├── 1ab8ff8b-53a7-40d2-8658-d627df775571.png
│   │   ├── 1ae1f1b6-3189-4a9a-b937-b88ead2e0593.png
│   │   ├── 1eb043d2-896f-469f-a82f-a1d761645a15.jpeg
│   │   ├── 22a42538-2e4a-4f1f-b43e-05b6739d47df.png
│   │   ├── 25a13db5-f544-4a6b-b125-937b7a46d318.png
│   │   ├── 328f9781-d269-4ba9-94e5-bb3b7a884372.png
│   │   ├── 367350fb-c2c0-4891-ae09-650010e6e0c6.png
│   │   ├── 4571c486-9213-49a3-82ba-866642a64d48.png
│   │   ├── 4e12938d-7e77-4371-ae7d-499feb1a2b57.png
│   │   ├── 55d584e4-e66a-48e6-b804-bb02b7a5ce9a.png
│   │   ├── 69bc1e09-47e4-4b17-a741-b2ecbe6d1e95.png
│   │   ├── 740e26b6-7cf2-4e50-a28c-1d1b1a9ae0a4.jpeg
│   │   ├── 74575f88-e464-43bb-9883-29d647c277e3.png
│   │   ├── 78296065-778c-4b10-8359-2051a85861cb.png
│   │   ├── 8a3a0a85-95a6-475a-aef5-387641d44acd.jpeg
│   │   ├── 8e630c8f-d06c-4825-b745-575700237751.jpeg
│   │   ├── 93448a44-8cde-43dc-a8d6-e06761980028.png
│   │   ├── 94a5d32d-33a8-40a0-8d5a-2f9baa6f06ba.png
│   │   ├── 95be07b6-f079-4872-bad8-27158db5bf27.jpeg
│   │   ├── 9617c3f4-0235-41d7-9031-433c5d2077b0.png
│   │   ├── 98fafa47-d43a-4ed6-a294-c09a1f41eb0e.png
│   │   ├── a39f8e32-b007-4f98-be71-0f4a816dab37.jpeg
│   │   ├── a80d9cff-1c37-4d15-8a04-40e00e1dee15.jpeg
│   │   ├── acf56e34-5cb8-4553-997c-186337b4a342.png
│   │   ├── acf95fd1-33fd-4800-9716-026961a8acb7.png
│   │   ├── b375b6bb-dcc5-473f-b70e-3d016ef8ca43.jpeg
│   │   ├── b92ae07e-12eb-4512-880b-73f2cf8ffe9b.png
│   │   ├── c22dafe8-10b6-488e-830c-54e2dd96b0b5.png
│   │   ├── c9365a4f-e561-4e52-987f-fe98347d0fa5.png
│   │   ├── cb7db7b6-bf15-4f9c-8f5e-5fbb43953eec.png
│   │   ├── cdb0fdc2-7010-4097-a6ff-5f7625603638.png
│   │   ├── ce3b3b16-6bc4-41a9-919d-95e61f1b8f49.png
│   │   ├── ce8e14f6-78c2-4fb5-bef9-d3f8e2f2b4f3.png
│   │   ├── d2ed1bc9-44fe-4491-b01d-6729a565e010.jpeg
│   │   ├── d6954661-c640-4b35-869e-a46bac149d79.png
│   │   ├── d7b9b62b-c750-4abc-8617-ab7c94151dcc.png
│   │   ├── d9954578-ab84-4c22-a4d7-cf4daab522a8.jpeg
│   │   ├── ece5d2db-ae29-477c-bf9e-c3c29fc1f91d.png
│   │   ├── f1f458a5-c2d6-4159-b933-68d28af3026c.png
│   │   ├── f66301c7-224d-4f2a-8544-2be12c1fffeb.png
│   │   ├── f8c7903b-74a7-4522-9126-5be85708ba6f.png
│   │   └── iniassets
│   ├── screenshoot
│   │   └── basisdata.jpg
│   └── seed
│       └── seed.sql
├── tsconfig.json
└── utils
    ├── auth.utils.ts
    ├── jwt.utils.ts
    └── user.utils.ts

```
## Skema Basis Data
![basisdata.jpg](storage%2Fscreenshoot%2Fbasisdata.jpg)

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
