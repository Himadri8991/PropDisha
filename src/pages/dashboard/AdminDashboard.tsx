import { useState, useEffect } from "react";
import { getDashboardStats, getLeads, Lead } from "@/lib/mock-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, Activity } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dashboardStats = await getDashboardStats();
      const allLeads = await getLeads();
      setStats(dashboardStats);
      setLeads(allLeads);
    };
    fetchData();
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-strong border-white/5 text-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <FileText className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.totalLeads}</div></CardContent>
        </Card>
        <Card className="glass-strong border-white/5 text-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Site Visits</CardTitle>
            <Building2 className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.siteVisits}</div></CardContent>
        </Card>
        <Card className="glass-strong border-white/5 text-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Partner Leads</CardTitle>
            <Users className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.partnerLeads}</div></CardContent>
        </Card>
        <Card className="glass-strong border-white/5 text-foreground">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Direct Leads</CardTitle>
            <Activity className="h-4 w-4 text-foreground/50" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{stats.directLeads}</div></CardContent>
        </Card>
      </div>

      <Card className="glass-strong border-white/5 text-foreground">
        <CardHeader>
          <CardTitle>Recent Leads Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/5">
                <TableHead className="text-foreground/50">Customer</TableHead>
                <TableHead className="text-foreground/50">Mobile</TableHead>
                <TableHead className="text-foreground/50">City</TableHead>
                <TableHead className="text-foreground/50">Source</TableHead>
                <TableHead className="text-foreground/50">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.slice(0, 10).map((lead) => (
                <TableRow key={lead.id} className="border-white/5">
                  <TableCell>{lead.customerName}</TableCell>
                  <TableCell>{lead.mobile}</TableCell>
                  <TableCell>{lead.city}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell><Badge variant="outline">{lead.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
