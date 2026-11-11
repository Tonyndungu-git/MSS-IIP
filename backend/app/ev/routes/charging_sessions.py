from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import SessionLocal

from app.ev.models.charging_session import ChargingSession
from app.ev.schemas.session import ChargingSessionCreate


router = APIRouter(
    prefix="/ev/sessions",
    tags=["EV Charging Sessions"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.get("/")
def get_sessions(
    db: Session = Depends(get_db)
):

    return db.query(ChargingSession).all()



@router.post("/")
def create_session(
    data: ChargingSessionCreate,
    db: Session = Depends(get_db)
):

    session = ChargingSession(
        **data.model_dump()
    )

    db.add(session)

    db.commit()

    db.refresh(session)

    return session