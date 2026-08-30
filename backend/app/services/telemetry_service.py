import json
import paho.mqtt.client as mqtt

from app.database.connection import SessionLocal
from app.models.telemetry import Telemetry


BROKER = "localhost"
PORT = 1883

TOPIC = "mss/assets/telemetry"



def save_telemetry(data):

    db = SessionLocal()

    asset_code = data["asset_id"]

    measurements = [
        ("power_kw", data["power_kw"], "kW"),
        ("temperature", data["temperature"], "C"),
        ("energy_kwh", data["energy_kwh"], "kWh"),
    ]

    for metric, value, unit in measurements:

        record = Telemetry(
            asset_code=asset_code,
            metric=metric,
            value=value,
            unit=unit
        )

        db.add(record)

    db.commit()
    db.close()

    db.commit()

    db.close()



def on_message(client, userdata, message):

    payload = json.loads(
        message.payload.decode()
    )

    print("Received:")
    print(payload)


    save_telemetry(payload)



def start_listener():

    client = mqtt.Client()

    client.connect(
        BROKER,
        PORT
    )


    client.subscribe(
        TOPIC
    )


    client.on_message = on_message


    print(
        "MSS Telemetry Service Running..."
    )


    client.loop_forever()