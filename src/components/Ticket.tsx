import { Ticket } from "@/types";
import clsx from "clsx";
import { useDrag } from "react-dnd";

export function TicketCard({ticket}:{ticket:Ticket}){
    const [{ isDragging }, drag, dragPreview] = useDrag<
      Ticket,
      void,
      { isDragging: boolean; didDrop: boolean }
    >(() => ({
      // "type" is required. It is used by the "accept" specification of drop targets.
      type: 'ticket',
      
      // The collect function utilizes a "monitor" instance (see the Overview for what this is)
      // to pull important pieces of state from the DnD system.
      item: ticket,
      collect: monitor => ({
        isDragging: monitor.isDragging(),
        didDrop: monitor.didDrop(),
      }),
    }));
  return <div ref={drag} className={clsx('bg-white cursor-pointer rounded-xl p-2 text-lg flex flex-col justify-around text-black min-h-[80px]',{
    'hidden':isDragging
  })}>
        <p>{isDragging ? 'dragging' : ticket.title}</p>
        <span className='bg-slate-700 rounded-full  text-white flex items-center justify-center'>{ticket.state}</span>
       </div>
  }