import time
import random
import json

import paho.mqtt.client as mqtt



client = mqtt.Client()


client.connect(
    "localhost",
    1883
)



charger_id = "CHG-001"



while True:


    telemetry = {

        "asset_id": charger_id,

        "asset_type": "EV_CHARGER",

        "power_kw": round(
            random.uniform(10,50),2
        ),

        "temperature": round(
            random.uniform(25,70),2
        ),

        "energy_kwh": round(
            random.uniform(1,10),2
        ),

        "status":
            random.choice(
                [
                    "AVAILABLE",
                    "CHARGING",
                    "IDLE"
                ]
            ),

        "timestamp":
            time.time()

    }


    client.publish(

        "mss/assets/telemetry",

        json.dumps(
            telemetry
        )

    )


    print(
        telemetry
    )


    time.sleep(5)