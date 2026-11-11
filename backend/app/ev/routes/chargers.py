from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.ev.models.charger import Charger
from app.ev.schemas.charger import ChargerCreate


router = APIRouter(
    prefix="/ev/chargers",
    tags=["EV Chargers"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/")
def get_chargers(
    db: Session = Depends(get_db)
):

    return db.query(Charger).all()



@router.post("/")
def create_charger(
    data: ChargerCreate,
    db: Session = Depends(get_db)
):

    charger = Charger(
        **data.model_dump()
    )

    db.add(charger)

    db.commit()

    db.refresh(charger)

    return charger