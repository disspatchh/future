import { useState } from 'react';
import MailSvg from '../../assets/icons/mail.svg?react';
import { RoundedButton } from '../../ui/rounded-button';

export const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <RoundedButton onClick={openModal}>
      <MailSvg />
    </RoundedButton>
  );
};
