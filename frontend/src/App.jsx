import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST} from './config';

import AddTicketModal from './components/AddTicketModal';
import TicketTable from './components/TicketTable';

import fetchTickets from './hooks/fetchTickets';

const App = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTicketsData();
  }, []);

  const fetchTicketsData = async () => {
      try {
        const ticketsData = await fetchTickets();
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

  const addTicket = async (newTicket) => {
    try {
      await axios.post(`${API_HOST}/ticket`, newTicket);
      fetchTicketsData();
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  const updateTicket = async (id, updatedTicket) => {
    try {
      await axios.put(`${API_HOST}/ticket/${id}`, updatedTicket);
      fetchTicketsData();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const deleteTicket = async (id) => {
    const confirmed = window.confirm(
      "Do you want to delete it ticket?"
    );

    if (!confirmed) {
      return;
    }
    try {
      await axios.delete(`${API_HOST}/ticket/${id}`);
      fetchTicketsData();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <div className="w-[90vw] mt-12 mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tickets</h1>
      <div className='flex justify-end mr-4'>
        <AddTicketModal onAddTicket={addTicket} />
      </div>
      <TicketTable tickets={tickets} updateTicket={updateTicket} onDeleteTicket={deleteTicket}/>
    </div>
  );
};

export default App;
