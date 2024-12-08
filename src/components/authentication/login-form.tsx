import clsx from "clsx";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function loginForm() {
  return <form>
     <Card>
        <CardHeader>
          <CardTitle>Welcome to Missions Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
            />
            {/* {actionState?.errors?.email && <p className="text-red-500 text-sm">{actionState.errors.email}</p>} */}
          </div>

          <div className="space-y-2 mb-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
            />
            {/* {actionState?.errors?.password && <p className="text-red-500 text-sm">{actionState.errors.password}</p>} */}
          </div>

        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between">
            <div className="justify-self-end">
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
  </form>
}