import { State, Ticket } from "@/domain/types";
import clsx from "clsx";
import { useDrop } from "react-dnd";
import { TicketCard } from "./Ticket";
import { PropsWithChildren } from "react";

export function CanbanColumn({ columnState,children,moveTicket,tickets }: PropsWithChildren<{ columnState: State,tickets:Ticket[],moveTicket:(ticket:Ticket,columnState:State)=>void}>) {
    const [{ isOver, canDrop }, drop] = useDrop<
    Ticket,
    void,
    { canDrop: boolean; isOver: boolean }
  >(() => ({
    accept: 'ticket',
    drop: ticket => {
        moveTicket(ticket,columnState);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
    return (
      <div ref={drop} className={clsx("h-full flex basis-full bg-slate-200 rounded-xl flex-col text-black overflow-hidden",{
        "bg-slate-300":isOver,
        "ring ring-blue-200":canDrop
      })}>
        <p className='h-10 flex items-center justify-center text-xl bg-slate-100 font-medium'>{columnState}</p>
        <div className={clsx("rounded-xl flex flex-col gap-2 p-2")}>
            {tickets.map(ticket=><TicketCard key={ticket.id} ticket={ticket}/>)}
        </div>
      </div>
    );
  }