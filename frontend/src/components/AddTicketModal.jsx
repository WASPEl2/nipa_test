import React, { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Textarea } from '@mantine/core';
import { MAX_TITLE_LENGTH ,MAX_DESCRIPTION_LENGTH ,MAX_NAME_LENGTH,MAX_EMAIL_LENGTH,MAX_PHONE_LENGTH} from '../config';

export default function AddTicketModal({ onAddTicket }) {
  const [opened, { open, close }] = useDisclosure(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const maxTitleLength = MAX_TITLE_LENGTH;
  const maxDescriptionLength = MAX_DESCRIPTION_LENGTH;
  const maxNameLength = MAX_NAME_LENGTH;
  const maxEmailLength = MAX_EMAIL_LENGTH;
  const maxPhoneLength = MAX_PHONE_LENGTH;

  const handleAddTicket = () => {
    if (!title.trim() || !description.trim() || !name.trim() || !email || !phone.trim()) {
      alert("Please fill all ticket detail");
      return;
    }

    const newTicket = {
      title: title,
      description: description,
      contact_info: {
        name: name,
        email: email,
        phone: phone
      }
    };

    onAddTicket(newTicket);

    // Reset form fields and close modal
    setTitle('');
    setDescription('');
    setName('');
    setEmail('');
    setPhone('');
    close();
  };

  const characterCountStyle = {
    color: '#666',
    fontSize: '0.8rem',
    float: 'right'
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Ticket" position="fixed-right">
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
        <Button mt={16} onClick={handleAddTicket}>Add Ticket</Button>
      </Modal>

      <Button onClick={open} style={{ backgroundColor: '#D13076', color: 'white' }}>Add Ticket</Button>
    </>
  );
}