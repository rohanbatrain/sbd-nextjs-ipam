"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Activity, Server, Globe, TrendingUp } from "lucide-react";
import Link from "next/link";
import { StatsWidget } from "@/components/ipam/stats-widget";
import { RecentActivity } from "@/components/ipam/recent-activity";
import dynamic from "next/dynamic";

// Lazy load heavy components
const HostList = dynamic(() => import("@/components/ipam/host-list"), {
  loading: () => <div className="animate-pulse h-64 bg-muted rounded-lg" />,
  ssr: false,
});

const UtilizationChart = dynamic(() => import("@/components/ipam/utilization-chart"), {
  loading: () => <div className="animate-pulse h-64 bg-muted rounded-lg" />,
  ssr: false,
});

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your IP address allocations and monitor network activity
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/search">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" />
              Search IPs
            </Button>
          </Link>
          <Link href="/allocate">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Allocate IP
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsWidget
          title="Total IPs"
          value="13.5M"
          description="Across all regions"
          icon={<Globe className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsWidget
          title="Active Hosts"
          value="8,432"
          description="Currently allocated"
          icon={<Server className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsWidget
          title="Utilization"
          value="68%"
          description="Network capacity"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 3, isPositive: false }}
        />
        <StatsWidget
          title="Recent Changes"
          value="24"
          description="Last 24 hours"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest IP allocation and modification events</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity limit={10} />
          </CardContent>
        </Card>

        {/* Network Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Network Utilization</CardTitle>
            <CardDescription>IP address usage over time</CardDescription>
          </CardHeader>
          <CardContent>
            <UtilizationChart />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/allocate" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Plus className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Allocate IP</div>
                  <div className="text-xs text-muted-foreground">Add new host</div>
                </div>
              </Button>
            </Link>
            <Link href="/search" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Search className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Search</div>
                  <div className="text-xs text-muted-foreground">Find IP addresses</div>
                </div>
              </Button>
            </Link>
            <Link href="/analytics" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <TrendingUp className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Analytics</div>
                  <div className="text-xs text-muted-foreground">View insights</div>
                </div>
              </Button>
            </Link>
            <Link href="/audit" className="block">
              <Button variant="outline" className="w-full justify-start gap-2 h-auto py-4">
                <Activity className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Audit Log</div>
                  <div className="text-xs text-muted-foreground">View history</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Hosts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Hosts</CardTitle>
              <CardDescription>Your recently allocated or modified IP addresses</CardDescription>
            </div>
            <Link href="/hosts">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <HostList limit={5} />
        </CardContent>
      </Card>
    </div>
  );
}
