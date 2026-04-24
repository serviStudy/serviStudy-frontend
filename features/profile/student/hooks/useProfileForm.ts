import { useState } from 'react';

export const useProfileForm = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");

  return {
    name, setName,
    contactNumber, setContactNumber,
    description, setDescription
  };
};
