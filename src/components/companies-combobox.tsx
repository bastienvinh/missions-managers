"use client"

import { Building2, Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import useCompanies from "@/hooks/companies"


interface CompaniesComboBoxProps {
  selected: string[]
  onSelectedChange: (values: string[]) => void
}

export default function CompaniesCombobox({ onSelectedChange, selected }: CompaniesComboBoxProps) {
  const { companies } = useCompanies()
  const [open, setOpen] = useState(false)

  function handleSelectCompany(company: string) {
    const currentSelectedCompanies = new Set([...selected])
    if (currentSelectedCompanies.has(company)) {
      // eslint-disable-next-line drizzle/enforce-delete-with-where
      currentSelectedCompanies.delete(company)
    } else {
      currentSelectedCompanies.add(company)
    }

    onSelectedChange(Array.from(currentSelectedCompanies))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="sm"
          className="w-[200px] h-7 py-0 justify-between"
        >
          <span className="flex gap-2 text-sm">
            <Building2 />
            Company {!!selected.length && `(${selected.length})`}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup>
              {companies.map((company, index) => (
                <CommandItem onSelect={() => handleSelectCompany(company)} className="flex justify-between" key={index}>
                  {company}
                  {selected.includes(company) && <Check />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
