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
from app.routes.dashboard import router as dashboard_router
from app.routes.telemetry import router as telemetry_router
from app.routes import context
from app.auth.router import router as auth_router
from app.routes import users

from app.ev.routes import vehicles
from app.ev.routes import stations
from app.ev.routes import chargers
from app.ev.routes import charging_sessions



from app.ev.routes.dashboard import router as ev_dashboard_router

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="M Synapses Systems API",
    version="0.1"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://mss-app-ten.vercel.app",
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

app.include_router(
    vehicles.router
)

app.include_router(
    stations.router
)

app.include_router(
    chargers.router
)

app.include_router(
    charging_sessions.router
)

app.include_router(asset_metrics_router)

app.include_router(ev_dashboard_router)

app.include_router(dashboard_router)

app.include_router(telemetry_router)


app.include_router(
    context.router
)


app.include_router(
    auth_router
)

app.include_router(
    users.router
)

@app.get("/")
def root():

    return {
        "company": "M Synapses Systems",
        "platform": "Intelligent Infrastructure Platform",
        "status": "running"
    }

@app.get("/health")
def health():
    return {
        "status":"ok",
        "service":"MSS API"
    }