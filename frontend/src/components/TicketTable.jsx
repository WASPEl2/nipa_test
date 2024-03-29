import React, { useState } from 'react';
import { Badge, Table, Group, Text, ActionIcon, Anchor, rem, SegmentedControl } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

import EditTicketModal from './EditTicketModal';
import ListWithIndentation from './ListWithIndentation';

export default function TicketTable({ tickets, updateTicket, onDeleteTicket }) {
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [clickedTicket, setClickedTicket] = useState(null);
  const [sortBy, setSortBy] = useState('id');
  const [filterByStatus, setFilterByStatus] = useState('all');

  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
    setEditModalOpened(true);
  };

  const handleRowClick = (rowid) => {
    if (clickedTicket != rowid)
      setClickedTicket(rowid);
    else
      setClickedTicket(null);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handleFilterByStatusChange = (value) => {
    setFilterByStatus(value);
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filterByStatus === 'all') {
      return true;
    } else {
      return ticket.status === filterByStatus;
    }
  });

  const sortedTickets = filteredTickets.sort((a, b) => {
    if (sortBy === 'id') {
      return b.id - a.id;
    } else if (sortBy === 'update_timestamp') {
      return new Date(b.update_timestamp) - new Date(a.update_timestamp);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  const formatTimestamp = (timestamp) => {
    const options = {
      timeZone: 'Asia/Bangkok',
      hour12: false,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return new Date(timestamp).toLocaleString('en-US', options);
  };

  const statusOptions = ["all", "pending", "accepted", "resolved", "rejected"];

  const rows = sortedTickets.map((item) => (
    <React.Fragment key={item.id}>
      <Table.Tr className={'cursor-pointer'} onClick={() => handleRowClick(item.id)}>
        <Table.Td style={{ verticalAlign: 'top' }}>
          <Text>{item.title}</Text>
        </Table.Td>

        <Table.Td>
          <Text fz="sm" fw={500}>{item.contact_info.name}</Text>
        </Table.Td>

        <Table.Td>
          <Badge color={item.status === "pending" ? "yellow" : item.status === "accepted" ? "blue" : item.status === "rejected" ? "orange" : "green"} variant="light">
            {item.status}
          </Badge>
        </Table.Td>

        <Table.Td>
          <Group gap={0} justify="flex-center">
            <ActionIcon variant="subtle" color="gray" onClick={(e) => { e.stopPropagation(); handleEditClick(item); }}>
              <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red" onClick={(e) => { e.stopPropagation(); onDeleteTicket(item.id); }}>
              <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>

      {clickedTicket && clickedTicket === item.id && (
        <Table.Tr>
          <Table.Td colSpan={5}>
            <div>
              <ListWithIndentation items={item.description} />
              <br/>
            </div>
            <div>
              <Text variant="muted" fz="sm">Email: {item.contact_info.email}</Text>
            </div>
            <div>
              <Text variant="muted" fz="sm">Phone: {item.contact_info.phone}</Text>
            </div>
            <div>
              <Text variant="muted" fz="sm">Created At: {formatTimestamp(item.create_timestamp)}</Text>
            </div>
            <div>
              <Text variant="muted" fz="sm">Updated At: {formatTimestamp(item.update_timestamp)}</Text>
            </div>
          </Table.Td>
        </Table.Tr>
      )}
    </React.Fragment>
  ));

  return (
    <>
      <SegmentedControl
        data={['id', 'update_timestamp', 'status']}
        value={sortBy}
        onChange={handleSortByChange}
        variant="outline"
        fullWidth
        size="sm"
        mt={8}
      />
      <SegmentedControl
        data={statusOptions}
        value={filterByStatus}
        onChange={handleFilterByStatusChange}
        variant="outline"
        fullWidth
        size="sm"
      />
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Contact Name</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {editModalOpened && (
        <EditTicketModal
          ticket={selectedTicket}
          onUpdateTicket={updateTicket}
          onClose={() => setEditModalOpened(false)}
        />
      )}
    </>
  );
}
