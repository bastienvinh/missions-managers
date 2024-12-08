import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoleEnum } from "@/services/authentication/type";
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

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={RoleEnum.ADMIN}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={RoleEnum.ADMIN}>Administrator</SelectItem>
                  <SelectItem value={RoleEnum.GUEST}>Guest</SelectItem>
                  <SelectItem value={RoleEnum.REDACTOR}>Redactor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between">
            <div>
              <Button variant="destructive">Delete Forever</Button>
            </div>
            <div className="justify-self-end">
              <Button variant="secondary" className="mr-3">Cancel</Button>
              <Button variant="outline">Add</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}