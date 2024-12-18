'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import useMissions from "@/hooks/missions"
import dayjs from "dayjs"
import _ from "lodash"
import { Label, Pie, PieChart } from "recharts"

interface TechnologieData {
  name: string
  value: number
}

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export default function TechnologyPieChart() {

  // FIXME: improve by doing specific database queries instead of useMission that is relatively big
  const { missions } = useMissions()

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
  } satisfies ChartConfig

  const allTechnologies = missions.reduce((result, mission) => {
    mission.technologies.forEach(techno => {
      result[techno] ??= { name: techno, value: 0 }
      result[techno].value += 1
    })

    if (!mission.technologies.length) {
      result['none'] ??= { name: 'none', value: 0 }
      result['none'].value += 1
    }

    return result
  }, {} as Record<string, TechnologieData>)

  Object.values(allTechnologies).forEach(techno => {
    Reflect.set(chartConfig, techno.name, {
      label: techno.name,
      color: getRandomColor()
    })
  })

  const nbTechnologies = _.sumBy(Object.values(allTechnologies), 'value')

  const chartData = Object.values(allTechnologies).map(techno => ({
    ...techno,
    fill: getRandomColor()
  }))

  // FIXME: fix this code, for some reason it's 
  const firstMission = _.minBy(missions, (mission) => dayjs(mission.createdAt).valueOf())
  const lastMission = _.maxBy(missions, (mission) => dayjs(mission.createdAt).valueOf())
  
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Number of missions per technology</CardTitle>
        <CardDescription>{missions.length ? `${dayjs(firstMission?.expirationDate).format('MMMM YYYY')} - ${dayjs(lastMission?.expirationDate).format('MMMM YYYY')}`: ''}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {nbTechnologies}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Technologies
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter></CardFooter> */}
    </Card>
  )
}