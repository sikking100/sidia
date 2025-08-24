export type CustomModalSize = 'sm' | 'lg' | 'xl';

export interface CustomModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  children: React.ReactNode;
  size?: CustomModalSize;
  className?: string;
  backdrop?: boolean | 'static';
  scrollable?: boolean;
  centered?: boolean;
}

export interface CustomModalData extends Omit<CustomModalProps, 'show' | 'onHide' | 'children'> {
  content: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}
