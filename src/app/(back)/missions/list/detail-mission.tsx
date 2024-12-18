import { MissionDTO } from "@/app/dal/missions-dal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import dayjs from "dayjs"
import { Eye } from "lucide-react"
import { useEffect, useState } from "react"

export default function DetailMission({ mission }: { mission: MissionDTO }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleTriggerClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(true)
  }

  // FIX: https://github.com/shadcn-ui/ui/issues/4068, beat me ...
  useEffect(() => { 
    if(!isOpen) { 
      return () => { document.body.style.pointerEvents = '' } 
    } 
  }, [isOpen])

  // TODO: Improve this danw dialog

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleTriggerClick} size="sm" className="w-full flex justify-start p-0 h-6 gap-1" variant="ghost" ><Eye /> Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] w-[90vw] h-[90vh] p-0" onPointerDownOutside={e => e.preventDefault()}>
        <div className="h-full grid grid-rows-[auto_1fr_auto] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="p-5 font-bold flex gap-20 items-center">
              <span className="text-4xl">{mission.title}</span> {mission.expirationDate && <span className="font-thin">Expire: ({dayjs(mission.expirationDate).format('YYYY-MM-DD')})</span>}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea>
            <div className="p-6 flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                {!!mission.technologies.length && <div className="flex gap-2">
                  Technologies: {mission.technologies.map((techno, index) => (<Badge variant="outline" key={index}>{techno}</Badge>))}
                </div>}

                <div className="flex gap-4">
                  <span>Created At:</span>
                  <span>{dayjs(mission.createdAt).format('YYYY-MM-DD')}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg">Salary</h3>
                $ {mission.salary} per year
              </div>

              <div>
                <h3 className="text-lg">Description</h3>
                {mission.description ?? 'None'}
              </div>

              <div>
                <h3 className="text-lg">Benefits</h3>
                {mission.benefits ?? 'None'}
              </div>

              <div>
                <h3 className="text-lg">Drawbacks</h3>
                {mission.drawbacks ?? 'None'}
              </div>
              
              {mission.sourceUrl && <div className="flex gap-4 items-center">
                <span>Source: </span>
                <a className="underline" href={mission.sourceUrl}>Link</a>
              </div>}
            </div>
          </ScrollArea>
          <div className="p-4 flex justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}