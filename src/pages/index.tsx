import { Inter } from "next/font/google";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { canbanColumns } from "@/domain/columns";
import { CanbanColumn } from "@/components/Column";
import { useCallback, useReducer } from "react";
import { State, Ticket } from "@/types";
import { TicketCard } from "@/components/Ticket";
import { tickets } from "@/domain/tickets";
import { useHandleTicketsState } from "@/hooks/useHandleTicketsState";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {state,reset,moveTicket}=useHandleTicketsState();
  return (
    <DndProvider backend={HTML5Backend}>
    <main className={`p-2 flex min-h-screen bg-white gap-2 ${inter.className}`}>
      <button
     onClick={reset} 
      className="absolute bottom-4 left-4 rounded-lg bg-slate-950 text-white px-4 py-2">Reset</button>
            <div className="flex w-full gap-4">
        {canbanColumns.map((columnState) => (
          <CanbanColumn key={columnState} moveTicket={moveTicket} columnState={columnState as State} >
          {state.tickets[columnState as State].map(ticket=><TicketCard key={ticket.id} ticket={ticket}/>)}
          </CanbanColumn>
        ))}
      </div>
    </main>
    </DndProvider>
  );
}


