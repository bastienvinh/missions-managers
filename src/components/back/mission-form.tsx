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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import dayjs from 'dayjs'
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"
import { UpdateMission } from "@/types/missions-types"
import { useRouter } from "next/navigation"

export default function MissionsForm({mission}: { mission?: UpdateMission }) {
  const form = useForm<MissionSchemaType>({
    resolver: zodResolver(MissionFormSchema),
    defaultValues: {
      analytics: mission?.analytics ?? true,
      company: mission?.company ?? '',
      type: mission?.type as ContractEnum ?? ContractEnum.Others,
      description: mission?.description ?? '',
      level: mission?.likeLevel ?? 0,
      salary: mission?.salary ?? 0,
      source: mission?.sourceUrl ?? '',
      technologies: mission?.technologies ?? [],
      title: mission?.title ?? `New Job # ${_.uniqueId()}`,
      url: mission?.sourceUrl ?? '',
      expirationDate: mission?.expirationDate ?? new Date(),
      id: mission?.id
    }
  })

  const [actionState, formAction] = useActionState(addUpdateMission, { init: true, success: false })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function onSubmitHandler(data: MissionSchemaType) {
    startTransition(() => formAction(data))
  }

  const hasError = !isPending && !actionState?.success && !actionState?.init

  useEffect(() => {
    if(!isPending && !actionState?.init && actionState?.success) {
      toast.success('Mission Created')
      router.refresh()
    } else if (!isPending && !actionState?.init && !actionState?.success) {
      toast.error('Failed Data Insertion')
    }
  }, [isPending, actionState, form, router])

  return (
    <Form {...form}>
      {hasError && <Alert className="mb-4" variant="destructive">
        <AlertTitle>Failed</AlertTitle>
        <AlertDescription>
          {actionState?.message ?? 'Failed Server Insertion'}
        </AlertDescription>
      </Alert>}
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="company" render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="expirationDate" render={({ field }) => (
          <FormItem className="flex flex-col gap-1">
            <FormLabel>Expiration Date (optional)</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        dayjs(field.value).format("YYYY-MM-DD")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="salary" render={({ field }) => (
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

        <FormField  control={form.control} name="description" render={({ field }) => (
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

        <FormField control={form.control} name="url" render={({ field }) => (
          <FormItem>
            <FormLabel>Url</FormLabel>
            <FormControl>
              <Input {..._.omit(field, 'value')} value={field.value ?? ''} type="text" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="level" render={({ field }) => (
          <FormItem>
            <FormLabel>Level (Rate this missions)</FormLabel>
            <FormControl>
              <StarRating rating={field.value} onRatingChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="source" render={({ field }) => (
          <FormItem>
            <FormLabel>Source</FormLabel>
            <FormControl>
              <SourceMissions source={field.value} onSourceChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="technologies" render={({field}) => (
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