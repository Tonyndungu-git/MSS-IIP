'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  RadioTower,
  Network,
  PlugZap,
  Cpu,
  Activity,
  Settings,
  ArrowRight
} from 'lucide-react';


export default function EdgeGatewayPage() {

  return (

    <AppShell>

      <div className="space-y-6">


        {/* Header */}
        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          justify-between
          gap-4
          pb-4
          border-b
          border-slate-800/80
        ">


          <div>

            <div className="flex items-center gap-2">

              <h1 className="
                text-xl
                sm:text-2xl
                font-bold
                font-mono
                tracking-tight
                text-white
              ">
                EDGE GATEWAY MANAGEMENT
              </h1>


              <span className="
                text-[10px]
                font-mono
                px-2
                py-0.5
                rounded
                bg-cyan-950
                text-cyan-400
                border
                border-cyan-800
                font-bold
              ">
                COMING SOON
              </span>

            </div>


            <p className="
              text-xs
              text-slate-400
              font-mono
              mt-1
            ">
              Industrial device connectivity, protocol configuration and telemetry onboarding layer
            </p>

          </div>



          <div className="
            flex
            items-center
            gap-2
            px-3
            py-2
            rounded
            bg-slate-900
            border
            border-slate-800
          ">

            <RadioTower className="
              w-4
              h-4
              text-cyan-400
              animate-pulse
            "/>


            <span className="
              text-xs
              font-mono
              text-slate-300
            ">
              Gateway Service: Standby
            </span>

          </div>


        </div>






        {/* Main Gateway Overview */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-4
        ">



          <div className="
            lg:col-span-2
            bg-[#070e1e]/90
            border
            border-slate-800
            rounded-lg
            p-6
            font-mono
          ">


            <div className="
              flex
              items-center
              gap-2
              mb-5
            ">

              <Network className="
                w-5
                h-5
                text-cyan-400
              "/>


              <h2 className="
                text-sm
                font-bold
                text-white
                uppercase
              ">
                Gateway Provisioning Pipeline
              </h2>


            </div>



            <div className="space-y-3">


              {[
                {
                  title:"Register Edge Gateway",
                  desc:"Add gateway hardware and assign it to an organization/site"
                },
                {
                  title:"Configure Protocol",
                  desc:"MQTT, Modbus TCP, OPC-UA, CAN Bus and custom connectors"
                },
                {
                  title:"Discover Devices",
                  desc:"Scan connected equipment and identify available telemetry points"
                },
                {
                  title:"Map Telemetry",
                  desc:"Define sensors, registers, metrics and data quality rules"
                }

              ].map((item,index)=>(


                <div
                  key={index}
                  className="
                    flex
                    items-start
                    gap-4
                    p-3
                    rounded
                    bg-slate-950
                    border
                    border-slate-800
                  "
                >


                  <div className="
                    w-7
                    h-7
                    rounded
                    bg-cyan-950
                    border
                    border-cyan-800
                    flex
                    items-center
                    justify-center
                    text-cyan-400
                    text-xs
                    font-bold
                  ">
                    {index+1}
                  </div>


                  <div>

                    <h3 className="
                      text-xs
                      text-white
                      font-bold
                    ">
                      {item.title}
                    </h3>


                    <p className="
                      text-[11px]
                      text-slate-400
                      mt-1
                    ">
                      {item.desc}
                    </p>

                  </div>


                </div>


              ))}



            </div>


          </div>






          {/* Status Panel */}

          <div className="
            bg-[#070e1e]/90
            border
            border-slate-800
            rounded-lg
            p-6
            font-mono
          ">


            <h2 className="
              text-xs
              font-bold
              text-white
              mb-5
              uppercase
            ">
              Gateway Components
            </h2>



            <div className="space-y-4">


              {[
                {
                  icon:Cpu,
                  label:"Hardware Discovery"
                },
                {
                  icon:PlugZap,
                  label:"Protocol Connectors"
                },
                {
                  icon:Activity,
                  label:"Telemetry Stream"
                },
                {
                  icon:Settings,
                  label:"Configuration Engine"
                }

              ].map((item)=>(

                <div
                  key={item.label}
                  className="
                    flex
                    items-center
                    gap-3
                    text-xs
                    text-slate-400
                  "
                >

                  <item.icon className="
                    w-4
                    h-4
                    text-cyan-400
                  "/>


                  {item.label}

                </div>


              ))}


            </div>



            <button
              disabled
              className="
                mt-8
                w-full
                py-2
                rounded
                bg-cyan-950
                border
                border-cyan-800
                text-cyan-400
                text-xs
                font-bold
                flex
                items-center
                justify-center
                gap-2
                opacity-70
              "
            >

              Configure Gateway

              <ArrowRight className="w-3 h-3"/>

            </button>


          </div>


        </div>



      </div>


    </AppShell>

  );
}