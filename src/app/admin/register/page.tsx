import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function Page() {
  return (
    <form className="w-full flex justify-center">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Register an user</CardTitle>
          <CardDescription>Can add/remove a new user</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
            />
          </div>

          <div className="space-y-2 mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
            />
          </div>

          <div className="space-y-2 mb-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
            />
          </div>

          <div className="space-y-2 mb-3">
            <Label htmlFor="verifyPassword">Verify Password</Label>
            <Input
              id="verifyPassword"
              name="verifyPassword"
              type="password"
            />
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div> */}
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button>Add</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}