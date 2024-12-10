'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import {useForm} from 'react-hook-form'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ContractEnum } from "@/services/missions/type"
import { Checkbox } from "../ui/checkbox"
import StarRating from "../star-rating"
import SourceMissions from "../source-missions"
import TechnologiesSelector from "../technologies-selector"
import { MissionFormSchema, MissionSchemaType } from "@/services/validation/ui/mission-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useActionState, useEffect, useTransition } from "react"
import { addUpdateMission } from "@/app/(back)/missions/action"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import _ from "lodash"
import { toast } from "sonner"
// import { AddMission } from "@/types/missions-types"
// import { redirect } from "next/navigation"

export default function MissionsForm() {
  const form = useForm<MissionSchemaType>({
    resolver: zodResolver(MissionFormSchema),
    defaultValues: {
      analytics: true,
      company: '',
      type: ContractEnum.Others,
      description: '',
      level: 0,
      salary: 0,
      source: '',
      technologies: [],
      title: 'Job #',
      url: ''
    }
  })

  const [actionState, formAction] = useActionState(addUpdateMission, { init: true, success: false })
  const [isPending, startTransition] = useTransition()

  function onSubmitHandler(data: MissionSchemaType) {
    console.log(data)
    startTransition(() => formAction(data))
  }

  const hasError = !isPending && !actionState?.success && !actionState?.init

  useEffect(() => {
    if(!isPending && !actionState?.init && actionState?.success) {
      toast.success('Mission Created')
    }
  }, [isPending, actionState])

  return (
    <Form {...form}>
      {hasError && <Alert variant="destructive">
        <AlertTitle>Failed</AlertTitle>
        <AlertDescription>
          {actionState?.message ?? 'Failed Server Insertion'}
        </AlertDescription>
      </Alert>}
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmitHandler)}>
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
            <Input
              type="number"
              {...field}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
              value={String(field.value)}
            />
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
                  <SelectItem key={ContractEnum.Internship} value={ContractEnum.Internship}>{ContractEnum.Internship}</SelectItem>
                  <SelectItem key={ContractEnum.Others} value={ContractEnum.Others}>{ContractEnum.Others}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="analytics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract Type</FormLabel>
              <FormControl>
                <div className="flex gap-2 items-center">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  <label htmlFor="analytics">Put on analytics</label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField name="sourceUrl" render={({ field }) => (
          <FormItem>
            <FormLabel>Url</FormLabel>
            <FormControl>
              <Input {...field} type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="likeLevel" render={({ field }) => (
          <FormItem>
            <FormLabel>Level (Rate this missions)</FormLabel>
            <FormControl>
              <StarRating rating={field.value} onRatingChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="sourceId" render={({ field }) => (
          <FormItem>
            <FormLabel>Source</FormLabel>
            <FormControl>
              <SourceMissions source={field.value} onSourceChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField name="technologies" render={({field}) => (
          <FormItem>
            <FormLabel>Technologies</FormLabel>
            <FormControl>
              <TechnologiesSelector value={field.value} onChangeValue={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex justify-end">
          <Button disabled={isPending} type="submit" variant="outline">Save</Button>
        </div>
      </form>
    </Form>
  )
}