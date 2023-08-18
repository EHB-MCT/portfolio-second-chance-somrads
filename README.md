[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DhYPBlwE)

# Portfolio Dev 5: Anonymously Connect by Somrad Sharma

Welcome to **Anonymously Connect**, a web app designed for moments when you want to voice your thoughts without revealing your real identity. Immerse yourself in a community where your thoughts are valued, free from the constraints of identity.

This project is a component of the Development 5 course for the Bachelor's Degree in Multimedia & Creative Technologies.

## Features

- **Anonymous Identity**: Sign up using a pseudonym and remain concealed. No registration, just log in.
- **Voice Yourself**: Share your troubles, ideas, and random thoughts under anonymity.
- **Engage & Connect**: Browse posts from fellow users and resonate with perspectives.
- **Control Over Content**: Feel a change of heart? Delete your post effortlessly.

> **Developer Note**: For now, users can delete others' posts. This feature is for development purposes and might not persist in future releases.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/EHB-MCT/portfolio-second-chance-somrads.git
   ```
2. Set up your `.env` file in the project root. Here are the properties (fill them as necessary):
   ```env
   POSTGRES_USER=root
   POSTGRES_PASSWORD=root
   POSTGRES_DATABASE=portfoliodev5
   TEST_POSTGRES_USER=test
   TEST_POSTGRES_PASSWORD=test
   TEST_POSTGRES_DATABASE=testdb
   DOCKERHUB_USERNAME=your_dockerhub_username
   ```

### CI/CD Configuration (Optional)

1. Go to your GitHub repo -> "Settings" -> "Secrets & variables" -> "Actions". Create the following secrets:

   ```env
   POSTGRES_USER=root
   POSTGRES_PASSWORD=root
   POSTGRES_DATABASE=portfoliodev5
   TEST_POSTGRES_USER=test
   TEST_POSTGRES_PASSWORD=test
   TEST_POSTGRES_DATABASE=testdb
   DOCKERHUB_USERNAME=your_dockerhub_username
   DOCKERHUB_TOKEN=your_dockerhub_token_or_password
   `
   ```

   > **Security Note**: The .env file is ignored via .gitignore for security. If you don't wish to use secrets, you can remove the .env entry from .gitignore. Do so at your own risk.

2. In Docker Hub, create a new public repository named `dev5-api`.

### Run the Project

1. Navigate to the project root directory:
   ```bash
   cd portfolio-second-chance-somrads
   ```
2. Before running the project, make sure to uncomment the `env_file` lines in the `docker-compose.yml` file:

```yaml
api:
  ...
  env_file:
    - .env
  ...
```

> **Important**: For the GitHub Actions CI/CD pipeline to work correctly, remember to comment out the `env_file` lines again before pushing any changes. The `.env` file is ignored in the repository for security purposes, and the GitHub Action workflow doesn't consider it.

3. Run the project:

```bash
docker-compose up --build
```

4. Use the Docker Desktop app to check running containers and their ports.

### How to Use

1. Open [http://localhost:5001](http://localhost:5001) to access the application.
2. For the REST API documentation, visit [http://localhost:80](http://localhost:80). Use [Postman](https://www.postman.com/) for testing the API CRUD operations.

## Dependencies

- Docker

## Resources

- [Docker Docs](https://docs.docker.com/)
- [Postman](https://www.postman.com/)
- [Knex.js](http://knexjs.org/)
- [Express.js](https://expressjs.com/)
- [Jest](https://jestjs.io/en/)
- [JSDoc](https://jsdoc.app)
- [React Docs](https://legacy.reactjs.org/docs/getting-started.html)
- [Axios](https://axios-http.com/docs/intro)
- [GitHub Workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)
- [GitHub Conventional Commits ](https://www.conventionalcommits.org/en/v1.0.0/)

## Support

Found a bug or issue? Raise an [issue](https://github.com/EHB-MCT/portfolio-second-chance-somrads/issues) in this repository.

## License

Released under the MIT License.

## Contact

Somrad Sharma - [somrad.sharma@student.ehb.be](mailto:somrad.sharma@student.ehb.be)
