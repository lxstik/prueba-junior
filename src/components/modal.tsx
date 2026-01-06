import type { ModalProps} from "../types";



export default function Modal({ user, onClose }: ModalProps) { //destructuro los props y especifiqué su tipo con ModalProps
    if (!user) return null; // evito renderizar si no hay usuario seleccionado

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center" 
        onClick={onClose} //cerrar el modal al hacer el click fuera
        >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4" 
            onClick={(e) => e.stopPropagation()} // así evito que el click dentro del modal lo cierre al no ser del botón cerrar o click afuera del modal
            >
                <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Teléfono:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
                <p><strong>Compañía:</strong> {user.company.name}</p>
                <p><strong>Dirección:</strong> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
                onClick={onClose}> {/*botón para cerrar modal*/}
                    Cerrar
                </button>
            </div>
        </div>
    );
}