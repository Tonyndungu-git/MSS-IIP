from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.ev.models.charging_station import ChargingStation
from app.ev.schemas.station import StationCreate


router = APIRouter(
    prefix="/ev/stations",
    tags=["EV Stations"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/")
def get_stations(
    db: Session = Depends(get_db)
):

    return db.query(ChargingStation).all()



@router.post("/")
def create_station(
    data: StationCreate,
    db: Session = Depends(get_db)
):

    station = ChargingStation(
        **data.model_dump()
    )

    db.add(station)

    db.commit()

    db.refresh(station)

    return station