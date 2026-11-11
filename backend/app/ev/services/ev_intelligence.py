from sqlalchemy.orm import Session

from app.ev.models.connector import Connector


class EVIntelligence:

    @staticmethod
    def available_connectors(db: Session):

        return (
            db.query(Connector)
            .filter(
                Connector.status == "AVAILABLE"
            )
            .all()
        )

    @staticmethod
    def occupied_connectors(db: Session):

        return (
            db.query(Connector)
            .filter(
                Connector.status == "CHARGING"
            )
            .all()
        )

    @staticmethod
    def utilization(db: Session):

        total = db.query(Connector).count()

        available = (
            db.query(Connector)
            .filter(
                Connector.status == "AVAILABLE"
            )
            .count()
        )

        occupied = total - available

        utilization = (
            occupied / total * 100
            if total
            else 0
        )

        return {
            "total": total,
            "available": available,
            "occupied": occupied,
            "utilization_percent": utilization,
        }