from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine
from app.models import *

from app.routes import organizations
from app.routes import sites
from app.routes import assets
from app.routes import telemetry
from app.routes import gateways
from app.routes.asset_metrics import router as asset_metrics_router
from app.routes import health




Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="M Synapses Systems API",
    version="0.1"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    organizations.router
)

app.include_router(
    sites.router
)

app.include_router(
    assets.router
)

app.include_router(
    telemetry.router
)



app.include_router(
    gateways.router
)

app.include_router(
    health.router
)

app.include_router(asset_metrics_router)

@app.get("/")
def root():

    return {
        "company": "M Synapses Systems",
        "platform": "Intelligent Infrastructure Platform",
        "status": "running"
    }