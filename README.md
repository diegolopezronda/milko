# Milko
A fictitious dairy company full-stack. The idea is to showcase the latest of 
my abilities in the field of software development, from backend to frontend, 
including machine learning and cloud computing.

#### Microsoft Azure Entra ID authentication
The API and the backend are protected with Entra ID authentication, so you will 
need to create an Entra ID application and configure it to allow access to the 
API (see references). Being a simple project, the applications expect two roles 
to be created in the Entra ID application:

* `analyst`: Basically can access Milk Quality Predictor assets.
* `visitor`: Can see everything, but cannot access Milk Quality Predictor assets.

You can create and configure the application in the Azure Portal at [Entra ID > App registrations](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps). 

>Profile edition and role management are federated to Microsoft Entra ID, so I 
>didn't find them a priority to implement in the project. However, it could be 
>done.

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
python3 -m venv .env --prompt "Milko API"
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

### Frontend
The frontend is built with React, and it is the user interface of the project. The frontend is located in the `frontend` folder.

#### Requirements
* Node.js >= 20.6.0

#### Installation

##### Next.js environment

```bash
cd frontend
npm install
```
##### Microsoft Azure Entra ID authentication
The frontend is protected with Entra ID authentication, so you will need to 
create an Entra ID application and configure it to allow access to the frontend 
(see references). After creating the application, you will need to set the following environment variables in the `.env.local` file:

```bash
AUTH_MICROSOFT_ENTRA_ID_ID=<your-entra-id-client-id>
AUTH_MICROSOFT_ENTRA_ID_SECRET=<your-entra-id-client-secret>
AUTH_MICROSOFT_ENTRA_ID_ISSUER=<your-entra-id-issuer>
AUTH_SECRET=<your-secret>
```
You can generate a secret with the following command:

```bash
openssl rand -base64 64
```
#### Execution

```bash
npm run dev
```
Will be available at `http://localhost:3000`.

### Milk Quality Predictor
The Milk Quality Predictor is a machine learning model that predicts the quality 
of milk based on its chemical composition. The model is built with scikit-learn 
and is located in the `milk_quality_predictor` folder.

>If your are here to see the results on your browser at GitHub, you can skip the 
>whole process and visit [milk-predictions.ipynb](./ml/milk-predictions.ipynb), 
>which is a Jupyter notebook that shows the model and its predictions.

#### Requirements

* Python 3.12.0

#### Installation

##### Python environment

```bash
cd ml
python3 -m venv .env --prompt "Milko ML"
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