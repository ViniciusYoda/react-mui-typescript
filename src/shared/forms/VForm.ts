import type { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import type { ForwardRefExoticComponent, PropsWithoutRef, ReactNode, RefAttributes } from 'react';

interface VFormProps {
  children?: ReactNode;
  onSubmit: (data: any) => void;
}

// O Unform 2 tipa o formulário com atributos de uma versão antiga do React.
// Esta fachada mantém a API usada pela aplicação sem exigir props HTML inexistentes.
export const VForm = Form as unknown as ForwardRefExoticComponent<
  PropsWithoutRef<VFormProps> & RefAttributes<FormHandles>
>;
