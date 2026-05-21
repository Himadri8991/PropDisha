import { useState, useEffect } from "react";
import { getLeads, addCRMResponse, Lead, getLeadByMobile, submitLead } from "@/lib/mock-api";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search } from "lucide-react";

const CRMDashboard = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchMobile, setSearchMobile] = useState("");
  const [searchedLead, setSearchedLead] = useState<Lead | null>(null);
  
  // CRM Response Modal
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [responseForm, setResponseForm] = useState({
    status: "Site Visit" as any,
    notes: "",
    followUpDate: "",
    siteVisitDate: ""
  });

  // Manual Lead Form
  const [manualLeadForm, setManualLeadForm] = useState({
    customerName: "",
    mobile: "",
    requirement: "2 BHK",
    budget: "",
    buyingTimeline: "Immediate" as any,
    city: user?.city || "Kolkata",
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

  const handleSearch = async () => {
    if (!searchMobile) return;
    const lead = await getLeadByMobile(searchMobile);
    if (lead) {
      if (lead.city !== user?.city) {
        toast.error("This lead belongs to another city CRM.");
        setSearchedLead(null);
        return;
      }
      setSearchedLead(lead);
      toast.success("Lead found!");
    } else {
      setSearchedLead(null);
      setManualLeadForm(prev => ({ ...prev, mobile: searchMobile }));
      toast.info("No lead found. You can create a new entry.");
    }
  };

  const handleResponseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    try {
      await addCRMResponse(selectedLead.id, responseForm.status, responseForm.notes, responseForm.followUpDate, responseForm.siteVisitDate);
      toast.success("Response added successfully");
      setResponseModalOpen(false);
      fetchLeads();
      if (searchedLead?.id === selectedLead.id) {
        handleSearch(); // Refresh searched lead
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleManualLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitLead({ ...manualLeadForm, source: "Direct Website Lead" } as any);
      toast.success("Lead created successfully");
      fetchLeads();
      handleSearch(); // Find it now
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const openResponseModal = (lead: Lead) => {
    setSelectedLead(lead);
    setResponseForm({ status: lead.status, notes: "", followUpDate: "", siteVisitDate: "" });
    setResponseModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">CRM Dashboard - {user?.city}</h1>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="bg-zinc-900 border border-white/5">
          <TabsTrigger value="search">Search & Update</TabsTrigger>
          <TabsTrigger value="leads">My Assigned Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-6 mt-4">
          <Card className="glass-strong border-white/5 text-foreground">
            <CardHeader>
              <CardTitle>Search Customer by Mobile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter 10-digit mobile number" 
                  value={searchMobile} 
                  onChange={e => setSearchMobile(e.target.value)}
                  className="bg-white/5 border-white/10 max-w-md"
                />
                <Button onClick={handleSearch} className="btn-gold">
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>

              {searchedLead ? (
                <div className="mt-6 p-4 glass rounded-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{searchedLead.customerName}</h3>
                      <p className="text-foreground/50">Mobile: {searchedLead.mobile}</p>
                      <p className="text-foreground/50">Requirement: {searchedLead.requirement} | Budget: {searchedLead.budget}</p>
                      <p className="text-foreground/50">Source: {searchedLead.source} {searchedLead.partnerId ? "(Partner)" : ""}</p>
                      <Badge className="mt-2">{searchedLead.status}</Badge>
                    </div>
                    <Button onClick={() => openResponseModal(searchedLead)} className="btn-gold">Update Status</Button>
                  </div>
                </div>
              ) : searchMobile.length >= 10 ? (
                <div className="mt-6 p-4 glass rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4">Create New Customer Lead</h3>
                  <form onSubmit={handleManualLeadSubmit} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Customer Name</Label>
                      <Input required value={manualLeadForm.customerName} onChange={e => setManualLeadForm({...manualLeadForm, customerName: e.target.value})} className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Requirement Type</Label>
                      <Select value={manualLeadForm.requirement} onValueChange={v => setManualLeadForm({...manualLeadForm, requirement: v})}>
                        <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2 BHK">2 BHK</SelectItem>
                          <SelectItem value="3 BHK">3 BHK</SelectItem>
                          <SelectItem value="4 BHK">4 BHK</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Budget</Label>
                      <Input required value={manualLeadForm.budget} onChange={e => setManualLeadForm({...manualLeadForm, budget: e.target.value})} className="bg-white/5 border-white/10" />
                    </div>
                    <Button type="submit" className="mt-8 btn-gold">Create Lead</Button>
                  </form>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="mt-4">
          <Card className="glass-strong border-white/5 text-foreground">
            <CardHeader>
              <CardTitle>Assigned Leads in {user?.city}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <p>Loading...</p> : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5">
                      <TableHead className="text-foreground/50">Name</TableHead>
                      <TableHead className="text-foreground/50">Mobile</TableHead>
                      <TableHead className="text-foreground/50">Source</TableHead>
                      <TableHead className="text-foreground/50">Status</TableHead>
                      <TableHead className="text-foreground/50">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id} className="border-white/5">
                        <TableCell>{lead.customerName}</TableCell>
                        <TableCell>{lead.mobile}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell><Badge variant="outline">{lead.status}</Badge></TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="text-amber-500 border-amber-600" onClick={() => openResponseModal(lead)}>Update</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={responseModalOpen} onOpenChange={setResponseModalOpen}>
        <DialogContent className="glass-strong border-white/5 text-foreground">
          <DialogHeader>
            <DialogTitle>Add CRM Response</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleResponseSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={responseForm.status} onValueChange={v => setResponseForm({...responseForm, status: v})}>
                <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Process">In Process</SelectItem>
                  <SelectItem value="Site Visit">Site Visit</SelectItem>
                  <SelectItem value="Call Later">Call Later</SelectItem>
                  <SelectItem value="Not Interested">Not Interested</SelectItem>
                  <SelectItem value="Submitted By Mistake">Submitted By Mistake</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {responseForm.status === "Site Visit" && (
              <div className="space-y-2">
                <Label>Site Visit Date</Label>
                <Input type="date" value={responseForm.siteVisitDate} onChange={e => setResponseForm({...responseForm, siteVisitDate: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
            )}
            {responseForm.status === "Call Later" && (
              <div className="space-y-2">
                <Label>Follow Up Date</Label>
                <Input type="date" value={responseForm.followUpDate} onChange={e => setResponseForm({...responseForm, followUpDate: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
            )}
            <div className="space-y-2">
              <Label>Notes</Label>
              <Input required value={responseForm.notes} onChange={e => setResponseForm({...responseForm, notes: e.target.value})} className="bg-white/5 border-white/10" />
            </div>
            <Button type="submit" className="w-full btn-gold">Submit Response</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CRMDashboard;
