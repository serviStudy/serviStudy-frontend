import { useState, useCallback } from 'react';

export const useProfileForm = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");

  const updateName = useCallback((val: string) => setName(val), []);
  const updateContactNumber = useCallback((val: string) => setContactNumber(val), []);
  const updateDescription = useCallback((val: string) => setDescription(val), []);

  return {
    name, setName: updateName,
    contactNumber, setContactNumber: updateContactNumber,
    description, setDescription: updateDescription
  };
};
