import Link from "next/link";

import Card from "../ui/Card";
import Badge from "../ui/Badge";

interface AssetCardProps {

    asset: any;

}

export default function AssetCard({

    asset,

}: AssetCardProps) {

    return (

        <Card>

            <div className="flex justify-between">

                <div>

                    <h2
                        className="
                            text-2xl
                            font-bold
                        "
                    >

                        {asset.name}

                    </h2>

                    <p className="text-slate-400">

                        {asset.asset_type}

                    </p>

                </div>

                <Badge
                    status={asset.status}
                />

            </div>

            <div
                className="
                    mt-6
                    space-y-2
                "
            >

                <p>

                    Manufacturer:

                    <b>

                        {" "}

                        {asset.manufacturer}

                    </b>

                </p>

                <p>

                    Health:

                    <b>

                        {" "}

                        {asset.health_score}%

                    </b>

                </p>

                <p>

                    Power:

                    <b>

                        {" "}

                        {asset.telemetry?.power_kw ?? "--"} kW

                    </b>

                </p>

            </div>

            <Link

                href={`/assets/${asset.id}`}

                className="
                    mt-8
                    inline-block
                    bg-cyan-500
                    text-black
                    px-5
                    py-3
                    rounded-lg
                    font-semibold
                "

            >

                Open Digital Twin

            </Link>

        </Card>

    );

}