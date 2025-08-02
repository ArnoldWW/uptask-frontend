import AddMemberForm from "./AddMemberForm";
import Modal from "../Modal";

export default function AddMemberModal() {
  return (
    <Modal openParam="addMember" title="Agregar miembro al equipo">
      <p>
        Busca el usuario por su correo electronico y agrega al equipo del
        proyecto
      </p>

      <AddMemberForm />
    </Modal>
  );
}
