import React, { useState } from 'react';
import { Modal, Button, TextInput, Textarea, Select } from '@mantine/core';
import { MAX_TITLE_LENGTH ,MAX_DESCRIPTION_LENGTH ,MAX_NAME_LENGTH,MAX_EMAIL_LENGTH,MAX_PHONE_LENGTH} from '../config';


export default function EditTicketModal({ ticket, onUpdateTicket, onClose }) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [status, setStatus] = useState(ticket.status);
  const [name, setName] = useState(ticket.contact_info.name);
  const [email, setEmail] = useState(ticket.contact_info.email);
  const [phone, setPhone] = useState(ticket.contact_info.phone);

  const maxTitleLength = MAX_TITLE_LENGTH;
  const maxDescriptionLength = MAX_DESCRIPTION_LENGTH;
  const maxNameLength = MAX_NAME_LENGTH;
  const maxEmailLength = MAX_EMAIL_LENGTH;
  const maxPhoneLength = MAX_PHONE_LENGTH;

  const statusOptions =['pending', 'accepted', 'resolved', 'rejected'  ]

  const handleUpdateTicket = () => {
    if (!title.trim() || !description.trim() || !name.trim() || !email || !phone.trim()) {
      alert("Please fill all ticket detail");
      return;
    }
    const updatedTicket = {
      ...ticket,
      title: title,
      description: description,
      status: status,
      contact_info: {
        name: name,
        email: email,
        phone: phone
      }
    };

    onUpdateTicket(ticket.id,updatedTicket);
    onClose();
  };

  const characterCountStyle = {
    color: '#666',
    fontSize: '0.8rem',
    float: 'right'
  };

  return (
    <Modal opened={true} onClose={onClose} title="Edit Ticket" position="fixed-right">
      <div className='mb-2'>
        <TextInput
          label="Title"
          placeholder="Enter title"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          maxLength={maxTitleLength}
          required
        />
        <span style={characterCountStyle}>({title.length}/{maxTitleLength})</span>
      </div>
      <div className='mb-2'>
        <Textarea
          label="Description"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
          maxLength={maxDescriptionLength}
          minRows={2}
          autosize
          required
        />
        <span style={characterCountStyle}>({description.length}/{maxDescriptionLength})</span>
      </div>
      <div className='mb-2'>
        <Select
          label="Status"
          data={statusOptions}
          value={status}
          onChange={(value) => setStatus(value)}
          required
        />
      </div>
      <div className='mb-2'>
        <TextInput
          label="Contact Name"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          maxLength={maxNameLength}
          required
        />
        <span style={characterCountStyle}>({name.length}/{maxNameLength})</span>
      </div>
      <div className='mb-2'>
        <TextInput
          label="Contact Email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          type="email"
          maxLength={maxEmailLength}
          required
        />
        <span style={characterCountStyle}>({email.length}/{maxEmailLength})</span>
      </div>
      <div className='mb-2'>
        <TextInput
          label="Contact Phone"
          placeholder="Enter phone"
          value={phone}
          onChange={(event) => setPhone(event.currentTarget.value)}
          maxLength={maxPhoneLength}
          required
        />
        <span style={characterCountStyle}>({phone.length}/{maxPhoneLength})</span>
      </div>
      <Button mt={16} onClick={handleUpdateTicket}>Update Ticket</Button>
    </Modal>
  );
}