'use client';

import React, { useEffect, useState } from "react";
import {
  Users,
  Shield,
  Building2,
  RefreshCw,
  Mail,
  UserCircle
} from "lucide-react";

import { getStoredUser } from "@/lib/supabase";
import { api } from "@/lib/api";

export default function UsersPage() {

  const currentUser = getStoredUser();

  const [user, setUser] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function loadUser() {

    if (!currentUser?.organization_id) return;

    setRefreshing(true);

    try {

      const members = await api.getOrganizationUsers(
        currentUser.organization_id
      );

      const me = members.find(
        (m: any) => m.user_id === currentUser.id
      );

      setUser(me);

    } finally {

      setRefreshing(false);

    }

  }

  useEffect(() => {

    loadUser();

  }, []);

  return (

    <div className="min-h-screen bg-[#020617] industrial-grid p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="flex items-center gap-3 text-3xl font-bold text-white">

              <Users className="w-8 h-8 text-cyan-400" />

              Organization Administration

            </h1>

            <p className="mt-2 text-sm text-slate-400">

              View your organization membership and assigned permissions.

            </p>

          </div>

          <button
            onClick={loadUser}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 bg-slate-900 hover:border-cyan-500 transition"
          >

            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />

            Refresh

          </button>

        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          <div className="rounded-xl border border-slate-800 bg-[#070e1e] p-6">

            <div className="flex items-center gap-4">

              <Building2 className="w-10 h-10 text-cyan-400" />

              <div>

                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Organization
                </p>

                <h3 className="text-lg font-semibold text-white mt-1">
                  {currentUser?.organization}
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-xl border border-slate-800 bg-[#070e1e] p-6">

            <div className="flex items-center gap-4">

              <Shield className="w-10 h-10 text-emerald-400" />

              <div>

                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Your Role
                </p>

                <h3 className="text-lg font-semibold text-white mt-1">
                  {currentUser?.role}
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-xl border border-slate-800 bg-[#070e1e] p-6">

            <div className="flex items-center gap-4">

              <Users className="w-10 h-10 text-purple-400" />

              <div>

                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Membership
                </p>

                <h3 className="text-lg font-semibold text-white mt-1">
                  Active
                </h3>

              </div>

            </div>

          </div>

        </div>

        <div className="rounded-xl border border-slate-800 bg-[#070e1e] overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-800">

            <h2 className="text-lg font-semibold text-white">
              Logged-in User
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Current authenticated MSS account.
            </p>

          </div>

          <div className="p-6">

            <div className="grid lg:grid-cols-2 gap-6">

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center">

                  <UserCircle className="w-10 h-10 text-cyan-400" />

                </div>

                <div>

                  <h3 className="text-xl font-semibold text-white">
                    {currentUser?.name}
                  </h3>

                  <p className="text-slate-400">
                    {currentUser?.email}
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                <div>

                  <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">
                    User ID
                  </p>

                  <p className="font-mono text-sm text-cyan-400 break-all">
                    {currentUser?.id}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">
                    Organization ID
                  </p>

                  <p className="font-mono text-sm text-cyan-400 break-all">
                    {currentUser?.organization_id}
                  </p>

                </div>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8">

              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">

                <div className="flex items-center gap-3 mb-2">

                  <Shield className="w-5 h-5 text-emerald-400" />

                  <span className="text-slate-300 font-medium">
                    Assigned Role
                  </span>

                </div>

                <span className="inline-flex px-3 py-1 rounded-full border border-cyan-800 bg-cyan-950 text-cyan-300 font-mono text-xs">

                  {user?.role || currentUser?.role}

                </span>

              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">

                <div className="flex items-center gap-3 mb-2">

                  <Mail className="w-5 h-5 text-cyan-400" />

                  <span className="text-slate-300 font-medium">
                    Login Email
                  </span>

                </div>

                <p className="text-sm text-white break-all">

                  {currentUser?.email}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}