# Job-Search-Vue-App

<div id="top"></div>

![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-white?style=for-the-badge&logo=vitest&logoColor=white)
![JSON-Server](https://img.shields.io/badge/json_server-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![Tailwind.CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<!-- PROJECT LOGO -->
<div align="center">
  <br>
      <img src="./src/assets/logo.png" alt="Logo" height="50" >
    </a>
  <br>
  <br>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#ports-and-endpoints">Ports and EndPoints</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Google Careers site clone using Vue.js

![Preview](./src/assets/preview-1.png)
![Preview](./src/assets/preview-2.png)

### Features

- Browse fetched jobs with (search + filter) feature
- filter jobs using:
  - Title / Skill
  - Degree
  - Organization
  - Job-type

### Built With

- Vue
- Pinia
- Vue Router
- Vue Test Utils / Vitest
- Typescript
- Tailwind.CSS
- Json-server

<p align="right">(<a href="#top">back to top</a>)</p>

---

<!-- GETTING STARTED -->

## Getting Started

This project require some perquisites and dependencies to be installed

> To get a local copy, follow these simple steps :

### Installation

#### installing Locally

1. Clone the repo

   ```sh
   git clone https://github.com/SayedShehata1/Job-Search-Vue-App
   ```

2. go to project folder

   ```sh
   cd Job-Search-Vue-App

   ```

3. install dependencies

   ```bash
   npm run install
   ```

4. Environmental Variables Set up

   - Here are the environmental variables that needs to be set in the `.env` file in the **main directory**.
   - These are the default setting that I used for development, but you can change it to what works for you.

   ```
    VUE_APP_API_URL=http://localhost:3000
   ```

5. Run development server

   ```sh
   npm run start
   ```

#### Running Unit Tests

- Run tests with coverage

  ```
  npm run test:unit
  ```

- Run tests with watcher

  ```
  npm run test:watch
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

---

### Ports and EndPoints

#### Ports

- FrontEnd Development Server runs on port `8000`
- BackEnd Development Server runs on port `3000`

#### API endpoints

**Main URL**: [http://localhost:3000](http://localhost:3000)

- Jobs: [http://localhost:3000/jobs](http://localhost:3000/jobs) [GET]
- Degrees: [http://localhost:3000/degrees](http://localhost:3000/degrees) [GET]
- Spotlights: [http://localhost:3000/spotlights](http://localhost:3000/spotlights) [GET]

<p align="right">(<a href="#top">back to top</a>)</p>

---

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>
