import { useState, useEffect } from "react";
import { getLeads, submitLead, Lead } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const PartnerDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    customerName: "",
    mobile: "",
    email: "",
    requirement: "2 BHK",
    budget: "",
    buyingTimeline: "Immediate" as any,
    city: "Kolkata" as any,
    notes: "",
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (error) {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitLead({
        ...formData,
        source: "Partner Lead",
      });
      toast.success("Lead submitted successfully");
      setOpen(false);
      fetchLeads();
    } catch (error: any) {
      toast.error(error.message || "Error submitting lead");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Partner Dashboard</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gold">Submit New Lead</Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/5 text-foreground max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Customer Lead</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Customer Name</Label>
                  <Input required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Mobile Number</Label>
                  <Input required value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>Requirement Type</Label>
                  <Select value={formData.requirement} onValueChange={v => setFormData({...formData, requirement: v})}>
                    <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2 BHK">2 BHK</SelectItem>
                      <SelectItem value="3 BHK">3 BHK</SelectItem>
                      <SelectItem value="4 BHK">4 BHK</SelectItem>
                      <SelectItem value="5 BHK">5 BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Budget</Label>
                  <Input required placeholder="e.g. 50L - 1Cr" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Select value={formData.city} onValueChange={v => setFormData({...formData, city: v as any})}>
                    <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kolkata">Kolkata</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timeline</Label>
                  <Select value={formData.buyingTimeline} onValueChange={v => setFormData({...formData, buyingTimeline: v as any})}>
                    <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediate">Immediate</SelectItem>
                      <SelectItem value="1 Month">1 Month</SelectItem>
                      <SelectItem value="3 Months">3 Months</SelectItem>
                      <SelectItem value="6 Months">6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Notes</Label>
                  <Input value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="bg-white/5 border-white/10" />
                </div>
              </div>
              <Button type="submit" className="w-full btn-gold">Submit Lead</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-strong border-white/5 text-foreground">
        <CardHeader>
          <CardTitle>My Submitted Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p>Loading leads...</p> : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5">
                  <TableHead className="text-foreground/50">Name</TableHead>
                  <TableHead className="text-foreground/50">Mobile</TableHead>
                  <TableHead className="text-foreground/50">Requirement</TableHead>
                  <TableHead className="text-foreground/50">City</TableHead>
                  <TableHead className="text-foreground/50">Status</TableHead>
                  <TableHead className="text-foreground/50">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="border-white/5">
                    <TableCell>{lead.customerName}</TableCell>
                    <TableCell>{lead.mobile}</TableCell>
                    <TableCell>{lead.requirement}</TableCell>
                    <TableCell>{lead.city}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-amber-600 text-amber-500">
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                {leads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-zinc-500">No leads submitted yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerDashboard;
