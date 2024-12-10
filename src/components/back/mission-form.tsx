'use client'

import { UserDTO } from "@/app/dal/user-dal.utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import {useForm} from 'react-hook-form'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ContractEnum } from "@/services/missions/type"

export default function MissionsForm(_value: { user?: UserDTO }) {
  const form = useForm()

  return (
    <Form {...form}>
      <form className="flex flex-col gap-3">
        <FormField name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="company" render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="expirationDate" render={({ field }) => (
          <FormItem>
            <FormLabel>Expiration Date (optional)</FormLabel>
            <FormControl>
              <Input {...field} type="date" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="salary" render={({ field }) => (
          <FormItem>
            <FormLabel>Salary</FormLabel>
            <FormControl>
              <Input {...field} type="number" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} rows={20} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={ContractEnum.Fulltime} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Contract" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem key={ContractEnum.Fulltime} value={ContractEnum.Fulltime}>{ContractEnum.Fulltime}</SelectItem>
                  <SelectItem key={ContractEnum.PartTime} value={ContractEnum.PartTime}>{ContractEnum.PartTime}</SelectItem>
                  <SelectItem key={ContractEnum.Permanent} value={ContractEnum.Permanent}>{ContractEnum.Permanent}</SelectItem>
                  <SelectItem key={ContractEnum.Temporary} value={ContractEnum.Temporary}>{ContractEnum.Temporary}</SelectItem>
                  <SelectItem key={ContractEnum.Others} value={ContractEnum.Others}>{ContractEnum.Others}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className="flex justify-end">
          <Button variant="outline">Save</Button>
        </div>
      </form>
    </Form>
  )
}