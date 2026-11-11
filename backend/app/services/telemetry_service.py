import json
from datetime import datetime, timezone

import paho.mqtt.client as mqtt

from app.database.connection import SessionLocal
from app.models.telemetry_event import TelemetryEvent
from app.models.asset import Asset


MQTT_BROKER = "localhost"
MQTT_PORT = 1883
MQTT_TOPIC = "mss/assets/telemetry"



def resolve_asset(db, asset_code):

    return (
        db.query(Asset)
        .filter(
            Asset.serial_number == asset_code
        )
        .first()
    )



def on_message(client, userdata, msg):

    db = SessionLocal()

    try:

        payload = json.loads(
            msg.payload.decode()
        )


        print("\nTelemetry received:")
        print(payload)



        # Device identity
        asset_code = payload.get(
            "asset_id"
        )


        if not asset_code:

            print(
                "Missing asset_id"
            )

            return



        # Convert CHG-001 -> Asset UUID
        asset = resolve_asset(
            db,
            asset_code
        )



        if not asset:

            print(
                f"Unknown asset: {asset_code}"
            )

            return



        print(
            f"Asset resolved: {asset.name} ({asset.id})"
        )



        event = TelemetryEvent(

            # IMPORTANT:
            # store UUID, not CHG-001
            asset_id=asset.id,


            # complete raw telemetry
            payload=payload,


            # server timestamp
            timestamp=datetime.now(
                timezone.utc
            )

        )



        db.add(event)

        db.commit()



        print(
            "Telemetry stored successfully"
        )



    except Exception as e:


        db.rollback()


        print(
            "Telemetry error:",
            e
        )



    finally:

        db.close()




def start_listener():

    client = mqtt.Client()

    client.on_message = on_message

    client.connect(
        MQTT_BROKER,
        MQTT_PORT,
        60
    )

    client.subscribe(
        MQTT_TOPIC
    )

    print(
        "Telemetry MQTT listener started..."
    )

    client.loop_forever()


if __name__ == "__main__":
    start_listener()