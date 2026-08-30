from fastapi import FastAPI

from app.database.connection import Base, engine
from app.models import *
from app.routes import organizations
from app.routes import sites
from app.routes import assets

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="M Synapses Systems API",
    version="0.1"
)

app.include_router(
    organizations.router,
    prefix="/organizations",
    tags=["Organizations"]
)

app.include_router(
    sites.router,
    prefix="/sites",
    tags=["Sites"]
)

app.include_router(
    assets.router,
    prefix="/assets",
    tags=["Assets"]
)

@app.get("/")
def root():
    return {
        "company": "M Synapses Systems",
        "platform": "Intelligent Infrastructure Platform",
        "status": "running",
    }