# Milko API

This is a simple [FastAPI](https://fastapi.tiangolo.com/) API for Milko, a 
fictional dairy company.

The endpoints of this API come from the challenges from courses, so they don't 
make more sense. Also, some of the endpoints come with pseudo-databases to 
simulate the behavior of a real API. Challenges are somewhat basic so I try 
to embrace best practices and make the code more readable and maintainable.

## Dependencies
 
 * [Python](https://www.python.org/downloads/) 3.10 or higher

## Environment setup

```
python3 -m venv .env --prompt "Milko API"
source .env/bin/activate
pip install -r requirements.txt
```

## Running the API

* In development mode `fastapi dev`
* In production mode `fastapi run`

In both cases, the API will be available at `http://localhost:8000`.