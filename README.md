# ☁️ Cloud Storage (NextJS + NestJS)

## 📄 Description

Explore the capabilities of a full-stack cloud storage solution built with Nest.js and Next.js, featuring server-side rendering (SSR) for optimized performance. This project presents a secure and intuitive user interface using Ant Design components, enabling efficient management and storage of digital content.


## 📚 Study Project Context:

This repository represents a study project aimed at delving into the realms of full-stack development, with a focus on cloud storage. It serves as a learning resource to understand the integration of Nest.js and Next.js in a real-world application scenario.

![TC Preview](https://i.ibb.co/zsD5rRZ/1.png)

## 🚀 Features:

- **User Registration**: New users can create accounts securely, with passwords hashed using bcrypt for enhanced protection.
- **File Uploading:** Users can upload digital content to the cloud storage server, making it easily accessible and manageable.
- **File Management:** Efficiently organize and manage files within folders, ensuring seamless retrieval and organization.
- **File Removal and Restoration:** Deleted files are moved to a trash can, providing an option for users to restore them if needed.
- **Permanent File Deletion:** Users can permanently delete files from the trash can when no longer required.

![TC Preview](https://i.ibb.co/BnSrBLY/2.png)

![TC Preview](https://i.ibb.co/G7SBN3Z/3.png)

## 🔨 Technology Stack:

- **Nest.js:** The backend leverages Nest.js' modular architecture and server-side capabilities. Various @nestjs/* packages are employed to implement different functionalities.
- **Next.js with SSR:** The frontend takes advantage of Next.js' server-side rendering for improved loading times and SEO optimization. Dynamic rendering ensures a smooth user experience.
- **Ant Design:** The UI is meticulously crafted using Ant Design components, offering a polished and responsive design. @ant-design/cssinjs and @ant-design/icons contribute to the visual appeal.

![TC Preview](https://i.ibb.co/r6Cb9zR/4.png)

## 🔒 Authentication and Security:

User authentication is achieved through @nestjs/jwt and @nestjs/passport, ensuring secure access to user data and files.
Security best practices, including password hashing with bcrypt, are followed to safeguard user information.

![TC Preview](https://i.ibb.co/vkk5qkb/5.png)

## 🛢️ Database Management:

TypeORM, integrated with @nestjs/typeorm, simplifies database interactions. PostgreSQL (pg) serves as the database, providing scalability and reliability.
