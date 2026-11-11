from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.ev.models.vehicle import Vehicle
from app.ev.schemas.vehicle import VehicleCreate


router = APIRouter(
    prefix="/ev/vehicles",
    tags=["EV Vehicles"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/")
def get_vehicles(
    db: Session = Depends(get_db)
):

    return db.query(Vehicle).all()



@router.post("/")
def create_vehicle(
    data: VehicleCreate,
    db: Session = Depends(get_db)
):

    vehicle = Vehicle(
        **data.model_dump()
    )

    db.add(vehicle)

    db.commit()

    db.refresh(vehicle)

    return vehicle