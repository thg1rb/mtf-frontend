'use client'

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployerStatsQueryOption } from "@/lib/api/employer/employers";

export default function Test() {
  const { data } = useQuery(getEmployerStatsQueryOption());

  return (
    <div>
      <p>{data?.totalEmployers}</p>
      <p>{data?.activeEmployers}</p>
      <p>{data?.inactiveEmployers}</p>
    </div>
  );
}
