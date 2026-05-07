export type ModalidadeVaga = "Presencial" | "Híbrido" | "Remoto";

export interface Vaga {
  id: number;
  titulo: string;
  empresa: string;
  descricao: string;
  bolsa: number;
  cargaHoraria: string;
  requisitos: string[];
  local: string;
  modalidade: ModalidadeVaga;
}

export interface UsuarioBase {
  id: number;
  login: string;
  nome: string;
  email: string;
  role: "estudante" | "empresa" | "admin";
}

export interface Estudante extends UsuarioBase {
  role: "estudante";
  curso?: string;
  habilidades?: string[];
}

export interface Empresa extends UsuarioBase {
  role: "empresa";
  cnpj?: string;
  setor?: string;
}
