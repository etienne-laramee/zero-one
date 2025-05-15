# Discrete Math learning project

A web application for calculating discrete mathematical formulas. The purpose is to lean math while becoming more familiar with Python, React and Typescript.

# To setup

1. Clone the repo
```bash
git clone https://github.com/yourusername/zero-one.git
cd zero-one
```

2. Start the docker instances
```bash
docker compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Combination
```
GET /combination?n={n}&r={r}
```

### Permutation
```
GET /permutation?n={n}&r={r}
```

### Factorial
```
GET /factorial?n={n}
```

### WIP: Amdahl's Law
```
GET /amdahl?p={p}&s={s}
```

## Contributing
This is a perseonal learning project, so contributions are not considered, but anyone is welcome to fork for their own use.