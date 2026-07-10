# Milko
A fictitious dairy company full-stack. The idea is to showcase the latest of 
my abilities in the field of software development, from backend to frontend, 
including machine learning and cloud computing.

## Apps

### API
The API is built with FastAPI, and it is the backend of the project. API is 
located in the `api` folder.

#### Requirements

* Python 3.12.0

#### Installation

##### Python environment

```bash
cd api
source .env/bin/activate
pip install -r requirements.txt
```
##### Microsoft Azure Entra ID authentication
The API is protected with Entra ID authentication, so you will need to create an
Entra ID application and configure it to allow access to the API (see references).

After creating the application, you will need to set the following environment
variables in the `.env_var` file:

```bash
TENANT_ID=<your-entra-id-tenant-id>
APP_CLIENT_ID=<your-entra-id-client-id>
```

#### Execution

```bash
fastapi dev
```
Will be available at `http://localhost:8000`.
> You can also access the API documentation at `http://localhost:8000/docs`

### Milk Quality Predictor
The Milk Quality Predictor is a machine learning model that predicts the quality 
of milk based on its chemical composition. The model is built with scikit-learn 
and is located in the `milk_quality_predictor` folder.

#### Requirements

* Python 3.12.0

#### Installation

##### Python environment

```bash
cd ml
source .env/bin/activate
pip install -r requirements.txt
```

### Execution

```bash
jupyter lab
```
A browser window will open with the Jupyter Lab interface. You can open the
`milk-predictions.ipynb` notebook to see the model and its predictions.

More information about Jupyter Lab can be found at 
[Jupyter Documentation](https://docs.jupyter.org/en/latest/).

## References
This is a list of references I used to learn and implement the project. I took 
the time to enlighten myself through learning paths rather than just reading 
documentation, and I highly recommend them.

* [Build REST APIs with FastAPI](https://www.linkedin.com/learning/build-rest-apis-with-fastapi)
* [Create Machine Learning Models](https://learn.microsoft.com/en-gb/training/paths/create-machine-learn-models/)
* [React Essential Training](https://www.linkedin.com/learning/react-essential-training/building-modern-user-interfaces-with-react?contextUrn=urn%3Ali%3AlyndaLearningPath%3A593715e0498e9e9be7fb8506)
* [Register apps with Microsoft Entra ID](https://learn.microsoft.com/en-gb/training/modules/register-apps-use-microsoft-entra-id/)

## Disclaimer

I have to divide my free time between learning new skills and applying them on 
this project. Unfortunately, I have not been able to dedicate as much time as I 
would like to this, so I have to prioritize what to implement first. So, if 
something looks incomplete, it is because it is; I will be adding more features 
as I learn and have time to implement them.

Below some of the features I will be implementing in the future, and some 
references I used to learn and implement the project.

Companies outside software world seem to like Azure, so I try to focus the work 
towards that Cloud offering.

### To-Do

* Add actual database connectors (Cosmos)
* Add testing
* Connect to machine learning
* Add dockerfile