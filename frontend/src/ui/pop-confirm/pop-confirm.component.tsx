import { Modal, IModalProps } from '../modal';
import { Button } from '../button';

interface IPopConfirmProps extends Omit<IModalProps, 'toggle'> {
  onSubmit?: () => void;
  onCancel?: () => void;
  question?: React.ReactNode;
  tip?: React.ReactNode;
}

export const PopConfirm = ({
  question,
  tip,
  onSubmit,
  onCancel,
  ...rest
}: IPopConfirmProps) => {
  return (
    <Modal
      title={question}
      toggle={onCancel}
      footer={
        <>
          <Button onClick={onCancel} design='primary'>
            Нет
          </Button>
          <Button
            onClick={() => {
              onSubmit();
              onCancel();
            }}
            design='danger'
          >
            Да
          </Button>
        </>
      }
      {...rest}
    >
      {tip}
    </Modal>
  );
};
