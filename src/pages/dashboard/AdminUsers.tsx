import { useState, useEffect } from "react";
import { getAllUsers, createUser, updateUserStatus, User } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AdminUsers = () => {
  const [users, setUsers] = useState<Omit<User, "password">[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
    role: "crm" as any,
    city: "Kolkata" as any,
  });

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (e) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({
        ...form,
        status: "Active",
      });
      toast.success("User created successfully");
      setOpen(false);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleStatus = async (user: Omit<User, "password">) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    try {
      await updateUserStatus(user.id, newStatus);
      fetchUsers();
      toast.success("Status updated");
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gold">Add New User</Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/5 text-foreground">
            <DialogHeader>
              <DialogTitle>Create CRM or Partner</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input required value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input required type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={v => setForm({...form, role: v})}>
                  <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crm">CRM</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.role === "crm" && (
                <div className="space-y-2">
                  <Label>Assigned City</Label>
                  <Select value={form.city} onValueChange={v => setForm({...form, city: v})}>
                    <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kolkata">Kolkata</SelectItem>
                      <SelectItem value="Mumbai">Mumbai</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Bangalore">Bangalore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <Button type="submit" className="w-full btn-gold">Create User</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-strong border-white/5 text-foreground">
        <CardHeader><CardTitle>All Users</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5">
                  <TableHead className="text-foreground/50">Name</TableHead>
                  <TableHead className="text-foreground/50">Mobile</TableHead>
                  <TableHead className="text-foreground/50">Role</TableHead>
                  <TableHead className="text-foreground/50">City</TableHead>
                  <TableHead className="text-foreground/50">Status</TableHead>
                  <TableHead className="text-foreground/50">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(u => (
                  <TableRow key={u.id} className="border-white/5">
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.mobile}</TableCell>
                    <TableCell className="capitalize">{u.role}</TableCell>
                    <TableCell>{u.city || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={u.status === "Active" ? "default" : "destructive"}>{u.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {u.role !== "admin" && (
                        <Button size="sm" variant="outline" onClick={() => toggleStatus(u)}>
                          Toggle Status
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
