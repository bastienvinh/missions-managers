'use client'

import dynamic from "next/dynamic"
import { getTechnologiesByNameService } from "@/services/missions/missions-service"

// import Select from 'react-select/creatable' 

interface TechnologiesSelectorProps {
  value?: string[]
  onChangeValue?: (source: string[]) => void
}

interface SelectValueType {
  value: string
  label: string
}

const Select = dynamic(() => import('react-select/async-creatable'), { ssr: false })

export default function TechnologiesSelector({ value, onChangeValue } : TechnologiesSelectorProps) {
  const values = value ? value.map(val => ({ value: val, label: val })) : []

  const customStyles = {
    control: (provided: object, state: { isFocused: boolean }) => ({
      ...provided,
      backgroundColor: 'hsl(var(--background))',
      borderColor: state.isFocused ? 'hsl(var(--primary))' : 'hsl(var(--border))',
      boxShadow: state.isFocused ? '0 0 0 1px hsl(var(--primary))' : 'none',
      '&:hover': {
        borderColor: 'hsl(var(--primary))',
      },
    }),
    menu: (provided: object) => ({
      ...provided,
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))',
      boxShadow: 'var(--shadow)',
    }),
    option: (provided: object, state: { isSelected: boolean, isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'hsl(var(--primary))'
        : state.isFocused
        ? 'hsl(var(--accent))'
        : 'transparent',
      color: state.isSelected ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
      '&:active': {
        backgroundColor: 'hsl(var(--accent))',
      },
    }),
    singleValue: (provided: object) => ({
      ...provided,
      color: 'hsl(var(--foreground))',
    }),
    input: (provided: object) => ({
      ...provided,
      color: 'hsl(var(--foreground))',
    }),
    placeholder: (provided: object) => ({
      ...provided,
      color: 'hsl(var(--muted-foreground))',
    }),
    multiValue: (provided: object) => ({
      ...provided,
      backgroundColor: 'hsl(var(--accent))',
    }),
    multiValueLabel: (provided: object) => ({
      ...provided,
      color: 'hsl(var(--accent-foreground))',
    }),
    multiValueRemove: (provided: object) => ({
      ...provided,
      color: 'hsl(var(--accent-foreground))',
      '&:hover': {
        backgroundColor: 'hsl(var(--destructive))',
        color: 'hsl(var(--destructive-foreground))',
      },
    }),
  }

  async function promiseOptions(term: string) {
    const technos = await getTechnologiesByNameService(term)
    return technos.map(techno => ({ value: techno, label: techno }))
  }

  return (
    <Select 
      isMulti
      value={values}
      onChange={e => onChangeValue && onChangeValue((e as unknown as SelectValueType[]).map(val => val.label))}
      styles={customStyles}
      placeholder="Type your technologies"
      noOptionsMessage={({ inputValue }) => (
        <div className="text-muted-foreground">
          {inputValue ? `No technologies found for "${inputValue}"` : "No technologies available"}
        </div>
      )}

      loadOptions={promiseOptions}
    />
  )
}