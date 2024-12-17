'use client'

import { Check, ChevronsUpDown, SquareCode } from "lucide-react"
import useTechnologies from "@/hooks/technologies"
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

interface TechnologiesComboBoxProps {
  selected: string[]
  onSelectedChange: (values: string[]) => void
}

export default function TechnologiesCombobox({ selected, onSelectedChange }: TechnologiesComboBoxProps) {
  const { technologies } = useTechnologies()

  const [open, setOpen] = useState(false)
  
  function handleSelectTechnology(company: string) {
    const currentSelectedTechnologies = new Set([...selected])
    if (currentSelectedTechnologies.has(company)) {
      // eslint-disable-next-line drizzle/enforce-delete-with-where
      currentSelectedTechnologies.delete(company)
    } else {
      currentSelectedTechnologies.add(company)
    }

    onSelectedChange(Array.from(currentSelectedTechnologies))
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
            <SquareCode />
            Technologies {!!selected.length && `(${selected.length})`}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search technologies..." />
          <CommandList>
            <CommandEmpty>No technology found.</CommandEmpty>
            <CommandGroup>
              {technologies.map((technology, index) => (
                <CommandItem onSelect={() => handleSelectTechnology(technology.id)} className="flex justify-between" key={index}>
                  {technology.name}
                  {selected.includes(technology.id) && <Check />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}